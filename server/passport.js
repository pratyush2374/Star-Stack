import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
import prisma from "./lib/prisma.js";
import fs from "fs";
import path from "path";

dotenv.config();

const addReviews = async (userId) => {
    
    const data = JSON.parse(fs.readFileSync(path.resolve("lib/data.json"), "utf-8"));
    
    for (const record of data) {
        await prisma.reviews.create({
            data: {
                customerName: record.customerName,
                customerEmail: record.customerEmail,
                rating: record.rating,
                content: record.content,
                date: record.date,
                response: record.response,
                adminId: userId,
            },
        });
    }
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3001/auth/google/callback",
            scope: ["email", "profile"],
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                let user = await prisma.admins.findUnique({
                    where: {
                        googleId: profile.id
                    }
                });

                // If user doesn't exist, create new user
                if (!user) {
                    user = await prisma.admins.create({
                        data: {
                            email: profile.emails[0]?.value,
                            name: profile.displayName,
                            image: profile.photos[0]?.value,
                            googleId: profile.id,
                        },
                    });

                    // Only add reviews for new users
                    await addReviews(user.id);
                }

                const userInfo = {
                    googleId: profile.id,
                    email: profile.emails[0]?.value,
                    fullName: profile.displayName,
                    profilePic: profile.photos[0]?.value,
                };

                return done(null, userInfo);

            } catch (err) {
                console.error('Authentication Error:', err);
                return done(err, null);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

export default passport;
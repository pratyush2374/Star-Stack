import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3001/auth/google/callback",
            scope: ["email", "profile"],
        },
        function (request, accessToken, refreshToken, profile, done) {
            try {
                console.log(`Google Profile:  ${profile}`);
                return done(null, profile); 

            } catch (err) {
                return done(err, null); 
            }   
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id); // Serialize user to session
});

passport.deserializeUser(function (user, done) {
    done(null, user); // Deserialize user from session
});

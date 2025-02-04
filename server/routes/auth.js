import { Router } from "express";
import passport from "passport";


const router = Router();

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failed",
    });
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Login Success",
            user: {
                googleId: req.user.googleId,
                email: req.user.email,
                fullName: req.user.fullName,
                profilePic: req.user.profilePic,
            },
        });
    } else {
        res.status(401).json({
            error: true,
            message: "Login Failed, Not authorized",
        });
    }
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/dashboard`,
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", { scope: ["email"] }));

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect(`${process.env.CLIENT_URL}/`);
        });
    });

    
});
export default router;

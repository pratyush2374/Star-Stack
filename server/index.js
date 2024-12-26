import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import "./passport.js";
import cors from "cors";
import router from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server started on http://localhost:3001");
});

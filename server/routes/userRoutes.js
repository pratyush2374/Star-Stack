import { Router } from "express";
import prisma from "../lib/prisma.js";

const userRouter = Router();

userRouter.get("/get-reviews", async (req, res) => {
    const data = req.body;

    const user = await prisma.admins.findFirst({
        where: {
            googleId: data.googleId,
        },
    });

    const reviews = await prisma.reviews.findMany({
        where: {
            adminId: user.id,
        },
    });

    res.status(200).json(reviews);
});

userRouter.post("/add-reply", async (req, res) => {
    const data = req.body;

    const review = await prisma.reviews.update({
        where: {
            id: data.reviewId,
        },
        data: {
            response: data.reply,
        },
    });

    res.status(200).json({ message: "Reply added successfully!" });
});

export default userRouter;

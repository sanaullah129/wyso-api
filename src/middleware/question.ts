import { NextFunction, Request, Response } from "express";
import Question from "../models/Question";
import { Mongoose } from "mongoose";

export const checkValidQuestionId = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body?.questionId || req.query.questionId;
    if (!userId) {
        return res.status(400).json({ message: "Question Id is required" });
    }

    if (!Mongoose.prototype.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid Question ID format" });
    }

    try {
        const user = await Question.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Question is not valid" });
        }
        next();
    } catch (error) {
        console.error("-- Middleware - Check Valid Question ID --", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
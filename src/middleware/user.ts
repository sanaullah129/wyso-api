import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { Mongoose } from "mongoose";

export const checkValidUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body?.userId || req.query.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    if (!Mongoose.prototype.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User is not valid" });
        }
        next();
    } catch (error) {
        console.error("-- Middleware - Check Valid User ID --", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
import { Request, Response } from "express";
import QuestionsModel from "models/Question";

export const fetchQuestions = async (req: Request, res: Response) => {
    try {
        const questions = QuestionsModel.find().sort({ stepNo: 1 });
        res.status(200).json({ message: "Questions fetched successfully", questions });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
}
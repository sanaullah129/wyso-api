import { Request, Response } from "express";
import QuestionsModel from "../../models/Question";

export const fetchQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await QuestionsModel.find().sort({ stepNo: 1 });
        res.status(200).json({ message: "Questions fetched successfully", questions });
    } catch (error) {
        console.error("-- Question Controller - fetch questions --", error);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
}
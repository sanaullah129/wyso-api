import { Request, Response } from "express";
import QuestionResponse from "../../models/QuestionResponse";
import { questionResponseSchema } from "./onboardValidation";

const submitResponse = async (req: Request, res: Response) => {
    try {
        const { error, value } = questionResponseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const response = await QuestionResponse.findOneAndUpdate(
            { userId: value.userId, questionId: value.questionId },
            { answer: value.answer },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: "Response saved", response });
    } catch (err: any) {
        res.status(500).json({ message: "Error saving response", error: err.message });
    }
};

export { submitResponse };

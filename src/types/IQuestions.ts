import { Document } from "mongoose";

export interface IQuestions extends Document {
    question: string;
    options: string[];
    stepNo: number;
}
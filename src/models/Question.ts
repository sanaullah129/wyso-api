import mongoose, { Schema } from "mongoose";
import { IQuestions } from "types/IQuestions";

const QuestionsSchema = new Schema<IQuestions>({
    question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
        unique: true
    },
    options: {
        type: [String],
        required: true
    },
    stepNo: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: true });

const QuestionsModel = mongoose.model<IQuestions>('Questions', QuestionsSchema);
export default QuestionsModel;
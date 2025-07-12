import mongoose, { Schema, Document } from "mongoose";

export interface IQuestionResponse extends Document {
    userId: mongoose.Types.ObjectId;
    questionId: string;
    answer: string;
}

const questionResponseSchema = new Schema<IQuestionResponse>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
}, { timestamps: true });

const QuestionResponse = mongoose.model<IQuestionResponse>("QuestionResponse", questionResponseSchema);
export default QuestionResponse;

import { Request, Response } from "express";
import QuestionResponse from "../../models/QuestionResponse";

export const getDropOffStats = async (req: Request, res: Response) => {
    try {
        const pipeline = [
            { $group: { _id: "$userId", questions: { $addToSet: "$questionId" } } },
            { $unwind: { path: "$questions" } },
            { $group: { _id: "$questions", users: { $addToSet: "$_id" }, dropOffs: { $sum: 1 } } },
            // Convert string questionId to ObjectId for lookup
            { $addFields: { questionObjId: { $toObjectId: "$_id" } } },
            { $lookup: {
                from: "questions",
                let: { qid: "$questionObjId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$qid"] } } },
                    { $project: { question: 1, stepNo: 1 } }
                ],
                as: "questionInfo"
            } },
            { $unwind: { path: "$questionInfo", preserveNullAndEmptyArrays: true } },
            // Lookup user info for each user who dropped off at this question
            { $lookup: {
                from: "users",
                let: { userIds: "$users" },
                pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$userIds"] } } },
                    { $project: { nickName: 1, emailId: 1 } }
                ],
                as: "userInfo"
            } },
            { $project: {
                questionId: "$_id",
                dropOffs: 1,
                question: "$questionInfo.question",
                stepNo: "$questionInfo.stepNo",
                users: "$userInfo"
            } },
            { $sort: { stepNo: 1 } }
        ] as any[];
        console.log("-- Drop-off Stats Pipeline --", JSON.stringify(pipeline));
        const stats = await QuestionResponse.aggregate(pipeline);
        res.status(200).json({ message: "Drop-off stats fetched", stats });
    } catch (error: any) {
        console.log("-- Error fetching drop-off stats --", error);
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
};

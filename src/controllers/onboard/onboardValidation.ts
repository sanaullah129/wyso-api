import Joi from "joi";

export const questionResponseSchema = Joi.object({
    userId: Joi.string().required(),
    questionId: Joi.string().required(),
    answer: Joi.string().allow('').optional(),
});

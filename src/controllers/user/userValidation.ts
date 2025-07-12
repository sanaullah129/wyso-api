import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    nickName: Joi.string().max(50).required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
});

export const loginSchema = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
});

import Joi from "joi";

const envSchema = Joi.object({
    MONGO_URI: Joi.string().uri().required(),
    PORT: Joi.number().default(4000),
    JWT_SECRET: Joi.string().min(10).required()
}).unknown();

export default envSchema;

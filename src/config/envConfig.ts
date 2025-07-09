import dotenv from "dotenv";
import envSchema from "./envSchema";

dotenv.config();

const { error, value: envVars } = envSchema.validate(process.env, { abortEarly: false });
if (error) {
    throw new Error(`Environment validation error: ${error.message}`);
}

export default Object.freeze({
    MONGO_URI: envVars.MONGO_URI,
    PORT: envVars.PORT,
    JWT_SECRET: envVars.JWT_SECRET
});
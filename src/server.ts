import envConfig from "./config/envConfig";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", routes);

connectDb(envConfig.MONGO_URI || "")
    .then(() => {
        console.log("Database connected successfully");
        app.listen(envConfig.PORT, () => {
            console.log("Server is successfully listening on port " + envConfig.PORT + "...");
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
import { Router } from "express";
import { submitResponse } from "./onboardController";
import authMiddleware from "../../middleware/auth";

const router = Router();

router.post("/", authMiddleware, submitResponse);

export default router;

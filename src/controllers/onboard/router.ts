import { Router } from "express";
import { submitResponse } from "./onboardController";
import authMiddleware from "../../middleware/auth";
import { checkValidUserId } from "../../middleware/user";
import { checkValidQuestionId } from "../../middleware/question";

const router = Router();

router.post("/", authMiddleware, checkValidUserId, checkValidQuestionId, submitResponse);

export default router;

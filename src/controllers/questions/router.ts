import { Router } from "express";
import { fetchQuestions } from "./questionsController";
import authMiddleware from "../../middleware/auth";

const router = Router();

router.get("/", authMiddleware, fetchQuestions);

export default router;
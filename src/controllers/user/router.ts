import { Router } from "express";
import { signUp, login } from "./userController";
import { submitResponse } from "../onboard/onboardController";
import authMiddleware from "../../middleware/auth";

const router = Router();


router.post("/signup", signUp);
router.post("/login", login);

export default router;
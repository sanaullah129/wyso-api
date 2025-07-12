import { Router } from "express";
import { getDropOffStats } from "./statsController";
import authMiddleware from "../../middleware/auth";

const router = Router();

/*
* Route to get drop-off stats
* An other token is recommended for this route as it should be accessible to admins or authorized users only
*/
router.get("/dropoffs", authMiddleware, getDropOffStats);

export default router;
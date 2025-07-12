import { Request, Response, Router } from "express";
import userRouter from "./controllers/user/router";
import onboardRouter from "./controllers/onboard/router";
import questionsRouter from "./controllers/questions/router";
import statsRouter from "./controllers/stats/router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

router.use("/users", userRouter);
router.use("/onboard", onboardRouter);
router.use("/questions", questionsRouter);
router.use("/stats", statsRouter);

export default router;
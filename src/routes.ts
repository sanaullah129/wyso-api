import { Request, Response, Router } from "express";
import userRouter from "./controllers/user/router";
import onboardRouter from "./controllers/onboard/router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

router.use("/users", userRouter);
router.use("/onboard", onboardRouter)

export default router;
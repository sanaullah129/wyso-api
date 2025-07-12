import { Router } from "express";
import userRouter from "./controllers/user/router";
import onboardRouter from "./controllers/onboard/router";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/onboard", onboardRouter)

export default routes;
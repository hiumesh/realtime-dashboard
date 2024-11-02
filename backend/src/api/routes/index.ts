import { Router } from "express";

import authRouter from "./auth";
import usersRouter from "./users";
import recordRouter from "./records";
import dashboardRouter from "./dashboard";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/records", recordRouter);
router.use("/dashboard", dashboardRouter);

export default router;

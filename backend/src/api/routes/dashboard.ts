import { Router } from "express";
import { checkAuthenticated } from "../middlewares/auth";
import dashboard from "../controllers/dashboard";

const router = Router();

router.get("/:chart", checkAuthenticated, dashboard);

export default router;

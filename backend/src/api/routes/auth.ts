import { Router } from "express";

import { token, signup, logout, authorize } from "../controllers/auth";
import validateRequest from "../middlewares/validate-request";
import { signupRequestSchema, tokenRequestSchema } from "../schemas/auth";

const router = Router();

router.post("/token", validateRequest(tokenRequestSchema), token);
router.post("/signup", validateRequest(signupRequestSchema), signup);
router.post("/logout", logout);
router.get("/authorize", authorize);

export default router;

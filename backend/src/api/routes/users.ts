import { Router } from "express";
import {
  getPreSignedUrl,
  getProfile,
  getUserNotifications,
  getUsers,
  updateUserRole,
} from "../controllers/users";
import validateRequest from "../middlewares/validate-request";
import { getPreSignedUrlSchema } from "../schemas/users";
import { checkAuthenticated, checkAuthorized } from "../middlewares/auth";

const router = Router();

router.get("/", checkAuthenticated, checkAuthorized(["admin"]), getUsers);
router.put(
  "/role",
  checkAuthenticated,
  checkAuthorized(["admin"]),
  updateUserRole
);
router.get("/notifications", checkAuthenticated, getUserNotifications);
router.get("/profile", checkAuthenticated, getProfile);
router.post(
  "/signed-url",
  checkAuthenticated,
  validateRequest(getPreSignedUrlSchema),
  getPreSignedUrl
);

export default router;

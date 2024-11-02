import { Router } from "express";

const router = Router();

import { findAll, count, upload } from "@/api/controllers/records";
import { checkAuthenticated, checkAuthorized } from "../middlewares/auth";
import validateRequest from "../middlewares/validate-request";
import {
  countRecordsRequestSchema,
  findRecordsRequestSchema,
  uploadRecordsUsingCSVRequestSchema,
} from "../schemas/records";

router.get(
  "/:module_name",
  checkAuthenticated,
  checkAuthorized(["admin", "manager"]),
  validateRequest(findRecordsRequestSchema),
  findAll
);
router.get(
  "/:module_name/count",
  checkAuthenticated,
  checkAuthorized(["admin", "manager"]),
  validateRequest(countRecordsRequestSchema),
  count
);
router.post(
  "/:module_name/upload",
  checkAuthenticated,
  checkAuthorized(["admin", "manager"]),
  validateRequest(uploadRecordsUsingCSVRequestSchema),
  upload
);

export default router;

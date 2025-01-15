import { Router } from "express";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { catchError } from "../common/middleware/cath-error.middleware"; // Assuming you have catch error middleware
import { upload } from "../common/middleware/upload.middleware"; 

const router = Router();

// Route for uploading profile image
router.post(
  "/:id/upload-profile-image",
  upload.single("profileImage"),
  userValidator.uploadProfileImage,
  catchError,
  userController.uploadProfileImage
);

// Route for uploading KYC document
router.post(
  "/:id/upload-kyc-document",
  userValidator.uploadKycDocument,
  catchError,
  userController.uploadKycDocument
);

// Route for updating qualification
router.patch(
  "/:id/update-qualification",
  userValidator.updateQualification,
  catchError,
  userController.updateQualification
);

export default router;

import { body, param } from "express-validator";

export const uploadProfileImage = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
  body("profileImage")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image file is required");
      }
      const file = req.file as Express.Multer.File;
      const validExtensions = ["jpg", "jpeg", "png"];
      const ext = file.mimetype.split("/")[1];

      if (!validExtensions.includes(ext)) {
        throw new Error("Invalid image file type");
      }
      return true;
    }),
];

export const uploadKycDocument = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
  body("kycDocument")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("KYC document file is required");
      }
      const file = req.file as Express.Multer.File;
      const validExtensions = ["pdf", "jpg", "jpeg", "png"];
      const ext = file.mimetype.split("/")[1];

      if (!validExtensions.includes(ext)) {
        throw new Error("Invalid document file type");
      }
      return true;
    }),
];

export const updateQualification = [
  param("id").isMongoId().withMessage("Invalid user ID format"),
  body("qualification").notEmpty().withMessage("Qualification is required"),
];

import { Request, Response } from "express";
import { upload } from "../common/middleware/upload.middleware"; // Adjust this path to your multer file
import * as UserService from "../user/user.service"; // Assume you have a user service to handle database interactions
import { createResponse } from "../common/helper/response.hepler"; // Assuming you have this helper function

// Controller for uploading profile image
export const uploadProfileImage = [
  upload.single("profileImage"), // Field name should match the file input field name in Postman
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).send(createResponse(null, "User not found"));
      }

      user.profileImage = req.file?.path; // Save file path in user's profile
      await user.save(); // Save the updated user object

      return res.send(createResponse(user, "Profile image uploaded successfully"));
    } catch (error) {
      res.status(500).send(createResponse(null, "Error uploading profile image"));
    }
  },
];

// Controller for uploading KYC document
export const uploadKycDocument = [
  upload.single("kycDocument"), // Field name should match the file input field name in Postman
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).send(createResponse(null, "User not found"));
      }

      user.kycDocument = req.file?.path; // Save file path in user's KYC document field
      await user.save();

      return res.send(createResponse(user, "KYC document uploaded successfully"));
    } catch (error) {
      res.status(500).send(createResponse(null, "Error uploading KYC document"));
    }
  },
];

// Controller for updating qualification
export const updateQualification = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { qualification } = req.body;

    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(404).send(createResponse(null, "User not found"));
    }

    user.qualification = qualification; // Update qualification
    await user.save();

    return res.send(createResponse(user, "Qualification updated successfully"));
  } catch (error) {
    res.status(500).send(createResponse(null, "Error updating qualification"));
  }
};

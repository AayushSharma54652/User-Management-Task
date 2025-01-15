import * as adminService from "./admin.service";
import * as userService from "../user/user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { sendCreatePasswordEmail } from "../common/services/email.service";


// Create a new admin
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.createAdmin(req.body);
  res.send(createResponse(result, "Admin created successfully"));
});

// Update admin details
export const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.updateAdmin(req.params.id, req.body);
  res.send(createResponse(result, "Admin updated successfully"));
});

// Edit specific admin details
export const editAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.editAdmin(req.params.id, req.body);
  res.send(createResponse(result, "Admin details updated successfully"));
});

// Delete an admin
export const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  await adminService.deleteAdmin(req.params.id);
  res.send(createResponse({}, "Admin deleted successfully"));
});

// Get admin by ID
export const getAdminById = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.getAdminById(req.params.id);
  res.send(createResponse(result));
});

// Get all admins
export const getAllAdmins = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.getAllAdmins();
  res.send(createResponse(result));
});

// Toggle admin active status
export const toggleAdminStatus = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminService.toggleAdminStatus(req.params.id, req.body.active);
  const statusMessage = req.body.active ? "unblocked" : "blocked";
  res.send(createResponse(result, `Admin ${statusMessage} successfully`));
});

// Get user analytics
export const getUserAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  const result = await adminService.getUserAnalytics(
    startDate?.toString(),
    endDate?.toString()
  );
  res.send(createResponse(result, "User analytics fetched successfully"));
});

// Send reminder email for KYC or onboarding
// export const sendReminderEmail = asyncHandler(async (req: Request, res: Response) => {
//   const { userId, type } = req.body;
//   if (!["KYC", "Onboarding"].includes(type)) {
//     res.status(400).send(createResponse(null, "Invalid email type", false));
//     return;
//   }

//   const result = await adminService.sendReminderEmail(userId, type as "KYC" | "Onboarding");
//   res.send(createResponse(result, "Reminder email sent successfully"));
// });


export const createUserByAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  // Create user in database
  const newUser = await userService.createUser({
    email,
    name: "",
    password: "", // Placeholder, user will create password
    active: true,
    role: "USER",
  });

  // Send "create password" email
  await sendCreatePasswordEmail(email, newUser._id);

  res.send(createResponse(null, "User created and invitation email sent successfully."));
});



// Controller to toggle user block/unblock status
export const toggleUserBlockStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Fetch the user by ID
  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).send(createResponse(null, "User not found"));
    return;
  }

  // Toggle the block status
  const newBlockedStatus = !user.blocked;

  // Update active and blocked fields
  const updatedUser = await userService.updateUser(id, {
    active: !newBlockedStatus, // Set active to false when blocking, true when unblocking
    blocked: newBlockedStatus, // Toggle the blocked status
  });

  const message = newBlockedStatus
    ? "User blocked successfully"
    : "User unblocked successfully";

  res.send(createResponse(updatedUser, message));
});

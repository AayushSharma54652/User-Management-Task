import { type IAdmin } from "./admin.dto";
import AdminSchema from "./admin.schema";

// Create a new admin
export const createAdmin = async (data: IAdmin) => {
  const result = await AdminSchema.create({ ...data, active: true });
  return result;
};

// Update admin details completely
export const updateAdmin = async (id: string, data: IAdmin) => {
  const result = await AdminSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

// Update admin details partially
export const editAdmin = async (id: string, data: Partial<IAdmin>) => {
  const result = await AdminSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

// Delete an admin
export const deleteAdmin = async (id: string) => {
  const result = await AdminSchema.deleteOne({ _id: id });
  return result;
};

// Get admin by ID
export const getAdminById = async (id: string) => {
  const result = await AdminSchema.findById(id).lean();
  return result;
};

// Get all admins
export const getAllAdmins = async () => {
  const result = await AdminSchema.find({}).lean();
  return result;
};

// Get admin by email
export const getAdminByEmail = async (email: string) => {
  const result = await AdminSchema.findOne({ email }).lean();
  return result;
};

// Block or unblock an admin
export const toggleAdminStatus = async (id: string, active: boolean) => {
  const result = await AdminSchema.findOneAndUpdate(
    { _id: id },
    { active },
    { new: true }
  );
  return result;
};

// Get user analytics (for admins)
export const getUserAnalytics = async (startDate?: string, endDate?: string) => {
  const match: any = {};
  
  if (startDate) match.createdAt = { $gte: new Date(startDate) };
  if (endDate) match.createdAt = { ...match.createdAt, $lte: new Date(endDate) };

  const registeredUsers = await AdminSchema.countDocuments(match);

  const activeSessions = await AdminSchema.aggregate([
    { $match: { active: true } },
    { $count: "activeSessions" },
  ]);

  return {
    registeredUsers,
    activeSessions: activeSessions[0]?.activeSessions || 0,
  };
};

// Send a reminder email for KYC or onboarding
// export const sendReminderEmail = async (userId: string, type: "KYC" | "Onboarding") => {
//   const user = await AdminSchema.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Simulate sending email
//   const emailContent =
//     type === "KYC"
//       ? `Dear ${user.name}, please complete your KYC process.`
//       : `Dear ${user.name}, please complete your onboarding process.`;

//   // Replace this with your email service logic
//   console.log(`Sending email to ${user.email}: ${emailContent}`);

//   return { message: "Email sent successfully" };
// };






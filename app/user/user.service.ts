import { type IUser, CreateUserDTO, UpdateUserDTO } from "./user.dto";
import UserSchema from "./user.schema";

/**
 * Create a new user.
 * @param data - User creation data.
 * @returns Newly created user.
 */
export const createUser = async (data: CreateUserDTO) => {
  const result = await UserSchema.create({ ...data, active: true });
  return result;
};

/**
 * Update an existing user's data.
 * @param id - User ID.
 * @param data - Updated user data.
 * @returns Updated user.
 */
export const updateUser = async (id: string, data: UpdateUserDTO) => {
  const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

/**
 * Get a user by their ID.
 * @param id - User ID.
 * @returns User data.
 */
export const getUserById = async (id: string) => {
  const result = await UserSchema.findById(id);
  return result;
};

/**
 * Get all users.
 * @returns List of all users.
 */
export const getAllUsers = async () => {
  const result = await UserSchema.find({}).lean();
  return result;
};

/**
 * Delete a user by ID.
 * @param id - User ID.
 * @returns Deletion result.
 */
export const deleteUser = async (id: string) => {
  const result = await UserSchema.deleteOne({ _id: id });
  return result;
};

/**
 * Get a user by their email address.
 * @param email - User email.
 * @returns User data.
 */
export const getUserByEmail = async (email: string) => {
  const result = await UserSchema.findOne({ email }).lean();
  return result;
};

/**
 * Block or unblock a user.
 * @param id - User ID.
 * @param blocked - Blocked status.
 * @returns Updated user data.
 */
export const toggleBlockUser = async (id: string, blocked: boolean) => {
  const result = await UserSchema.findOneAndUpdate(
    { _id: id },
    { blocked },
    { new: true }
  );
  return result;
};



// Function to save the user after changes



/**
 * Get user analytics for admin.
 * @returns User analytics data.
 */
export const getUserAnalytics = async () => {
  const totalUsers = await UserSchema.countDocuments();
  const activeUsers = await UserSchema.countDocuments({ active: true });
  const pendingOnboarding = await UserSchema.countDocuments({
    onboardingCompleted: false,
  });
  const pendingKYC = await UserSchema.countDocuments({ kycCompleted: false });

  return {
    totalUsers,
    activeUsers,
    pendingOnboarding,
    pendingKYC,
  };
  
};

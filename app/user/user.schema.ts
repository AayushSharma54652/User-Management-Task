import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { type IUser } from "./user.dto";

const Schema = mongoose.Schema;

/**
 * Hash password before saving the user document.
 * @param password - Plain text password.
 * @returns Hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    blocked: { type: Boolean, default: false },
    kycCompleted: { type: Boolean, default: false },
    onboardingCompleted: { type: Boolean, default: false },
    profileImage: { type: String }, // Stores path to the profile image
    qualification: { type: String }, // Stores the qualification text or string
    kycDocument: { type: String }, // Stores path to the KYC document
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);

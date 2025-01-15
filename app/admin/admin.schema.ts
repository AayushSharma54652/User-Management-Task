import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { type IAdmin } from "./admin.dto";

const Schema = mongoose.Schema;

// Helper function to hash passwords
const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 12);
    return hash;
};

const AdminSchema = new Schema<IAdmin>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["ADMIN"], default: "ADMIN" },
    active: { type: Boolean, required: false, default: true },
    createdUsers: { type: Number, required: false, default: 0 },
    accessToken: { type: String, required: false }, // To store the latest access token
    refreshToken: { type: String, required: false }, // To store the latest refresh token
}, { timestamps: true });

// Pre-save hook to hash the password before saving
AdminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
    next();
});

// Instance method to validate password
AdminSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Instance method to set tokens
AdminSchema.methods.setTokens = function (accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
};

// Instance method to clear tokens
AdminSchema.methods.clearTokens = function () {
    this.accessToken = null;
    this.refreshToken = null;
};

export default mongoose.model<IAdmin>("Admin", AdminSchema);

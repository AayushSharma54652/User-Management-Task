import { type BaseSchema } from "../common/dto/base.dto";

export interface IAdmin extends BaseSchema {
    email: string; // Admin's email for login
    password: string; // Admin's hashed password
    role: "ADMIN"; // Fixed role for Admin
    active?: boolean; // To indicate if the admin account is active (optional, defaults to true)
    createdUsers?: number; // Count of users created by this admin
    accessToken?: string; // Current access token (optional)
    refreshToken?: string; // Current refresh token (optional)
}

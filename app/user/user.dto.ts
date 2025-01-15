import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password: string;
  active?: boolean; // Default to true
  role: "USER" | "ADMIN"; // Role designation
  blocked?: boolean; // Whether the user is blocked (default false)
  kycCompleted?: boolean; // KYC completion status (default false)
  onboardingCompleted?: boolean; // Onboarding completion status (default false)
  profileImage?: string; // Profile image file path or URL
  qualification?: string; // Qualification string or list of qualifications
  kycDocument?: string; // KYC document file path or URL
}


export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  active: boolean;
  role?: "USER"; // Default is USER, as Admin creation will be controlled elsewhere
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  blocked?: boolean;
  kycCompleted?: boolean;
  onboardingCompleted?: boolean;
  profileImage?: string; 
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AnalyticsResponseDTO {
  totalUsers: number;
  activeSessions: number;
  pendingOnboarding: number;
  pendingKYC: number;
}

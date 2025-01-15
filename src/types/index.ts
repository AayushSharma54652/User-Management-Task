interface User {
    _id: string;
    email: string;
    password?: string;
    isBlocked: boolean;
    isActive: boolean;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    invitationToken?: string;
    invitationExpires?: Date;
    refreshToken?: string;
    profile?: {
      username?: string;
      dateOfBirth?: Date;
      completed: boolean;
    };
    qualification?: {
      highSchool?: string;
      skills: string[];
      completed: boolean;
    };
    kyc?: {
      aadharImage?: string;
      completed: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  
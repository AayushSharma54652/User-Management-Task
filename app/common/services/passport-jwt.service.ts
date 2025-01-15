import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "../../user/user.service";
import * as adminService from "../../admin/admin.service";
import { type Request } from "express";
import { type IUser } from "../../user/user.dto";
import { type IAdmin } from "../../admin/admin.dto";

const isValidPassword = async (value: string, password: string): Promise<boolean> => {
  return bcrypt.compare(value, password);
};

export const initPassport = (): void => {
  // JWT Strategy for both users and admins
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: { user: Request["user"] }, done) => {
        try {
          done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // User login
  passport.use(
    "user-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return done(createError(401, "User not found!"), false);
          }

          if (!user.active) {
            return done(createError(401, "User is inactive"), false);
          }

          const isValid = await isValidPassword(password, user.password);
          if (!isValid) {
            return done(createError(401, "Invalid email or password"), false);
          }

          const { password: _p, ...result } = user; // Exclude password from response
          done(null, result, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      }
    )
  );

  // Admin login
  // passport.use(
  //   "admin-login",
  //   new LocalStrategy(
  //     {
  //       usernameField: "email",
  //       passwordField: "password",
  //     },
  //     async (email, password, done) => {
  //       try {
  //         const admin = await adminService.getAdminByEmail(email);
  //         if (!admin) {
  //           return done(createError(401, "Admin not found!"), false);
  //         }

  //         if (!admin.active) {
  //           return done(createError(401, "Admin is inactive"), false);
  //         }

  //         const isValid = await isValidPassword(password, admin.password);
  //         if (!isValid) {
  //           return done(createError(401, "Invalid email or password"), false);
  //         }

  //         const { password: _p, ...result } = admin; // Exclude password from response
  //         done(null, result, { message: "Logged in Successfully" });
  //       } catch (error: any) {
  //         done(createError(500, error.message));
  //       }
  //     }
  //   )
  // );
};

// Generate tokens for users
export const createUserTokens = (user: Omit<IUser, "password">) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const accessToken = jwt.sign({ ...user, role: "USER" }, jwtSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ ...user, role: "USER" }, jwtSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Generate tokens for admins
export const createAdminTokens = (admin: Omit<IAdmin, "password">) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const accessToken = jwt.sign({ ...admin, role: "ADMIN" }, jwtSecret, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ ...admin, role: "ADMIN" }, jwtSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Decode token to extract user/admin details
export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token);
  return decoded as IUser | IAdmin;
};

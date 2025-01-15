import { param, body } from "express-validator";

export const createAdmin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["ADMIN"])
    .withMessage("Role must be ADMIN"),
];

export const updateAdmin = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string"),
];


export const editAdmin = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be a boolean"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string"),
];

export const toggleAdminStatus = [
  body("active")
    .notEmpty()
    .withMessage("Active status is required")
    .isBoolean()
    .withMessage("Active must be a boolean"),
];

export const loginAdmin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
];

export const sendReminderEmail = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("User ID must be a string"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["KYC", "Onboarding"])
    .withMessage("Type must be either 'KYC' or 'Onboarding'"),
];

export const getUserAnalytics = [
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be in ISO 8601 format"),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be in ISO 8601 format"),
];


export const createUserByAdmin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

export const toggleUserBlockStatus = [
  param("id").notEmpty().withMessage("User ID is required"),
  body("blocked")
    .isBoolean()
    .withMessage("Block status must be a boolean")
    .notEmpty()
    .withMessage("Block status is required"),
];
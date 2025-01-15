import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as adminController from "./admin.controller";
import * as adminValidator from "./admin.validation";

const router = Router();

router
  .get(
    "/analytics",
    adminValidator.getUserAnalytics,
    catchError,
    adminController.getUserAnalytics
  )
  .get("/:id", catchError, adminController.getAdminById)
  .delete("/:id", catchError, adminController.deleteAdmin)
  .post(
    "/create",
    adminValidator.createAdmin,
    catchError,
    adminController.createAdmin
  )
  .post(
    "/create-user",
    adminValidator.createUserByAdmin, // Validation for creating a user
    catchError,
    adminController.createUserByAdmin // Controller to handle user creation
  )
  .put(
    "/update/:id",
    adminValidator.updateAdmin,
    catchError,
    adminController.updateAdmin
  )
  .patch(
    "/edit/:id",
    adminValidator.editAdmin,
    catchError,
    adminController.editAdmin
  )
  .patch(
    "/status/:id",
    adminValidator.toggleAdminStatus,
    catchError,
    adminController.toggleAdminStatus
  )

  .patch(
    "/toogleBlock/:id",
    adminValidator.toggleUserBlockStatus, // Validation for block/unblock request
    catchError,
    adminController.toggleUserBlockStatus // Controller to handle the logic
  );

export default router;

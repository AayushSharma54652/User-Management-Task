import express from "express";

import adminRoutes from "./admin/admin.route";
import userRoutes from "./user/user.routes";

// routes
const router = express.Router();

// router.use("/users", userRoutes);
// router.use("/tasks", taskRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
export default router;
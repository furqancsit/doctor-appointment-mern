import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile, updateProfile,
  logoutUser,
  changePassword
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🟢 Register user
router.post("/register", registerUser);

// 🔵 Login user
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// 🟡 Get user profile (protected later with middleware)
router.get("/profile", protect, getUserProfile);

router.get("/update", protect, updateProfile);
router.get("/change-password", protect, changePassword);

export default router;
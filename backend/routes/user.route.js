import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// 🟢 Register user
router.post("/register", registerUser);

// 🔵 Login user
router.post("/login", loginUser);

// 🟡 Get user profile (protected later with middleware)
router.get("/profile", getUserProfile);

export default router;
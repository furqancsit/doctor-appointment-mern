import express from "express";
import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} from "../controllers/doctor.controller.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🟢 Create doctor
router.post("/", protect, authorizeRoles("/admin"), createDoctor);

// 🔵 Get all doctors
router.get("/", getAllDoctors);

// 🟡 Get single doctor
router.get("/:id", protect, authorizeRoles("user"), getDoctorById);

// 🟠 Update doctor
router.put("/:id", protect, authorizeRoles("admin", "doctor"), updateDoctor);

// 🔴 Delete doctor
router.delete("/:id", protect, authorizeRoles("admin"), deleteDoctor);

export default router;
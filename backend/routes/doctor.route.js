import express from "express";
import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor, getDoctorDashboard
} from "../controllers/doctor.controller.js";
import { getDoctors } from "../controllers/doctor.controller.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, authorizeRoles("admin", "doctor"), getDoctorDashboard);


// 🟢 Create doctor
router.post("/create", protect, authorizeRoles("admin"), createDoctor);

// 🔵 Get all doctors
router.get("/", getAllDoctors);

// search
router.get("/search", getDoctors);


// 🟡 Get single doctor
router.get("/:id", getDoctorById);

// 🟠 Update doctor
router.put("/:id", protect, authorizeRoles("admin", "doctor"), updateDoctor);

// 🔴 Delete doctor
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteDoctor);

export default router;
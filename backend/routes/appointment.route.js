import express from "express";
import {
    bookAppointment,
    getAllAppointments,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    cancelAppointment,
} from "../controllers/appointment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles('patient'), bookAppointment);

router.get("/", getAllAppointments);

router.get("/my", protect, authorizeRoles("patient"), getMyAppointments);

router.get("/doctor/:doctorId", protect, getDoctorAppointments);

router.patch("/:id/status", protect, authorizeRoles("doctor"), updateAppointmentStatus);

router.delete("/:id", protect, authorizeRoles("admin", "doctor", "patient"), cancelAppointment);

export default router;
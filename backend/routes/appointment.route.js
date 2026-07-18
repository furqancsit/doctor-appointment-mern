import express from "express";
import {
  bookAppointment,
  getBookedSlotsForDate,
  getAllAppointments,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../controllers/appointment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/book", protect, authorizeRoles("patient"), bookAppointment);
router.get("/availability/:doctorId/:date", getBookedSlotsForDate);

router.get("/patients", protect, authorizeRoles("admin"), getAllAppointments);

router.get("/my", protect, authorizeRoles("patient"), getMyAppointments);

router.get("/doctor/appointment", protect, getDoctorAppointments);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("doctor", "admin"),
  updateAppointmentStatus,
);

router.patch("/cancel/:id", protect, cancelAppointment);

export default router;

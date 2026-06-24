import { Appointment } from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

/**
 * Book Appointment
 * POST /api/appointments
 */
export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, slot } = req.body;

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // Check if slot is already booked
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate,
            slot,
            status: { $ne: "cancelled" },
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: "Slot already booked",
            });
        }

        const appointment = await Appointment.create({
            patient: req.user._id, // From auth middleware
            doctor: doctorId,
            appointmentDate,
            slot,
        });

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get All Appointments (Admin)
 * GET /api/appointments
 */
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient", "name email")
            .populate("doctor");

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get Logged In Patient Appointments
 * GET /api/appointments/my
 */
export const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            patient: req.user._id,
        }).populate("doctor");

        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get Doctor Appointments
 * GET /api/appointments/doctor/:doctorId
 */
export const getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            doctor: req.params.doctorId,
        }).populate("patient", "name email");

        res.status(200).json({
            success: true,
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Update Appointment Status
 * PATCH /api/appointments/:id/status
 */
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        appointment.status = status;

        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment status updated",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Cancel Appointment
 * DELETE /api/appointments/:id
 */
export const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        appointment.status = "cancelled";

        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
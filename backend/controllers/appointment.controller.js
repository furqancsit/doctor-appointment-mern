import { Appointment } from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

const normalizeAppointmentDate = (value) => {
  if (value instanceof Date) return value;

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.test(trimmedValue);

    if (dateOnlyMatch) {
      const [year, month, day] = trimmedValue.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    const parsedDate = new Date(trimmedValue);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

/**
 * Book Appointment
 * POST /api/appointments
 */
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, slot, reason, patientDetails } =
      req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate: normalizeAppointmentDate(appointmentDate),
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
      appointmentDate: normalizeAppointmentDate(appointmentDate),
      slot,
      reason,
      patientDetails,
      consultationFee: doctor.fee,
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
export const getBookedSlotsForDate = async (req, res) => {
  try {
    const { doctorId, date } = req.params;
    const targetDate = normalizeAppointmentDate(date);
    const start = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
    );
    const end = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      23,
      59,
      59,
      999,
    );

    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: { $gte: start, $lte: end },
      status: { $ne: "cancelled" },
    }).select("slot");

    res.status(200).json({
      success: true,
      bookedSlots: appointments.map((appointment) => appointment.slot),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
    const doctorProfile = await Doctor.findOne({
      userId: req.user._id,
    }).select("_id");

    if (!doctorProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctorProfile._id,
    })
      .populate("patient", "name email")
      .sort({ appointmentDate: -1 });

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
 */ export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 🔒 CHECK OWNERSHIP (VERY IMPORTANT)
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to cancel this appointment",
      });
    }

    // ❌ Already cancelled
    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    // ❌ Prevent cancelling completed appointments (optional but good)
    if (appointment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed appointment cannot be cancelled",
      });
    }
    const appointmentTime = new Date(appointment.appointmentDate);

    // If you store time separately, adjust this
    const now = new Date();

    const diffHours = (appointmentTime - now) / (1000 * 60 * 60);

    if (diffHours < 6) {
      return res.status(400).json({
        success: false,
        message: "You can only cancel 6 hours before appointment",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();
    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

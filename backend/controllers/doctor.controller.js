import { Appointment } from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

const defaultAvailability = [
  { day: "Monday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Tuesday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Wednesday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Thursday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Friday", slots: ["09:00 AM", "10:00 AM"] },
  { day: "Saturday", slots: ["09:00 AM", "10:00 AM"] },
];

const normalizeAvailability = (availability) => {
  if (Array.isArray(availability) && availability.length > 0) {
    return availability
      .filter((entry) => entry && typeof entry === "object")
      .map((entry, index) => {
        const fallback = defaultAvailability[index % defaultAvailability.length];
        const day = typeof entry.day === "string" && entry.day.trim()
          ? entry.day.trim()
          : fallback.day;

        const rawSlots = Array.isArray(entry.slots)
          ? entry.slots
          : typeof entry.slots === "string"
            ? entry.slots.split(",").map((slot) => slot.trim()).filter(Boolean)
            : [];

        const slots = rawSlots.length > 0 ? rawSlots : fallback.slots;

        return { day, slots };
      });
  }

  return [...defaultAvailability];
};

// 🟢 Create Doctor (Admin only in real apps)
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      qualification,
      experience,
      phone,
      email,
      hospitalName,
      address,
      fee,
      availability,
    } = req.body;

    const normalizedAvailability = normalizeAvailability(availability);

    const doctor = await Doctor.create({
      userId: req.user._id,
      name,
      specialization,
      qualification,
      experience,
      phone,
      email,
      hospitalName,
      address,
      fee,
      availability: normalizedAvailability,
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message || "errrrrrr" });
  }
};

// 🔵 Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Get Single Doctor
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update Doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// search
export const getDoctors = async (req, res) => {
  try {
    const search = (req.query.search || "").trim();

    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ],
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);   // <-- print full error 
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    })
  }
}


export const getDoctorDashboard = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctorProfile) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctorProfile._id,
    });

    const totalAppointments = appointments.length;


    // status counts
    const statusCount = appointments.reduce(
      (acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      },
      { pending: 0, approved: 0, cancelled: 0, completed: 0 }
    );

    // unique patients
    const uniquePatients = new Set(
      appointments.map((a) => a.patient.toString())
    );

    // today appointments
    const today = new Date().toDateString();

    const todayAppointments = appointments.filter(
      (a) =>
        new Date(a.appointmentDate).toDateString() === today
    );

    // upcoming appointments
    const upcomingAppointments = appointments.filter(
      (a) => new Date(a.appointmentDate) > new Date()
    );

    // slot distribution
    const slotMap = appointments.reduce((acc, curr) => {
      acc[curr.slot] = (acc[curr.slot] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      totalAppointments,
      totalPatients: uniquePatients.size,
      statusCount,
      todayAppointments: todayAppointments.length,
      upcomingAppointments: upcomingAppointments.length,
      slotMap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
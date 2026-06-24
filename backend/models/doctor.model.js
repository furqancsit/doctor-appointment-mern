import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: Number, // in years
            required: true,
        },
        fee: {
            type: Number,
            required: true,
        },
        availability: [
            {
                day: String, // e.g. Monday
                slots: [String], // e.g. ["10:00 AM", "2:00 PM"]
            },
        ],
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
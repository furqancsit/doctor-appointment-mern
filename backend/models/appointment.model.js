import mongoose, { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        doctor: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        appointmentDate: {
            type: Date,
            required: true,
        },

        slot: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "cancelled", "completed"],
            default: "pending",
        },

        reason: {
            type: String,
            trim: true,
        },

        notes: {
            type: String,
            trim: true,
        },

        consultationFee: {
            type: Number,
            default: 0,
        },

        patientDetails: {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            age: Number,
            gender: {
                type: String,
                enum: ["Male", "Female", "Other"],
            },
            
            phone: String,
            email: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Appointment = model("Appointment", appointmentSchema);
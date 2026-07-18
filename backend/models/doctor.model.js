import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        qualification: {
            type: String,
            required: true,

        },
        phone: String,
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
            unique: true
        },
        hospitalName: {
            type: String,
            required: true,
        },
        address: {
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
        availability: {
            type: [
                {
                    day: String,
                    slots: [String],
                },
            ],
            default: [
                { day: "Monday", slots: ["09:00 AM", "10:00 AM"] },
                { day: "Tuesday", slots: ["09:00 AM", "10:00 AM"] },
                { day: "Wednesday", slots: ["09:00 AM", "10:00 AM"] },
                { day: "Thursday", slots: ["09:00 AM", "10:00 AM"] },
                { day: "Friday", slots: ["09:00 AM", "10:00 AM"] },
                { day: "Saturday", slots: ["09:00 AM", "10:00 AM"] },
            ],
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },

    },
    { timestamps: true }

);
doctorSchema.index({
    name: "text",
    specialization: "text",
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
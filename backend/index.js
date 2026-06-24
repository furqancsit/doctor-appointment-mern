import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { registerUser, loginUser, getUserProfile } from "./controllers/user.controller.js";

import userRouter from "./routes/user.route.js"
import doctorRouter from "./routes/doctor.route.js"
import appointmentRouter from "./routes/appointment.route.js"
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(urlencoded())

// Connect Database
connectDB();

// Routes
app.post("/api/v1/auth", userRouter);
app.post("/api/v1/doctor", doctorRouter);
app.get("/api/v1/appointment", appointmentRouter);

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
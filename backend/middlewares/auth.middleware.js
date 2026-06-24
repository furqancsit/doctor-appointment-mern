import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Get token from cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Get user from DB (exclude password)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // 4. Attach user to request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed",
        });
    }
};
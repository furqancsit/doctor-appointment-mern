import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// 🟢 Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "name  email and password must required" })
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "patient"

        });

        let token = generateToken(user._id);

        let cookieOption = {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
        }

        res.cookie("token", token, cookieOption).status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔵 Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({ message: "email or Passwrord must be required" })

        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "invalid email " })
        }

        const isPasswordMatch = await user.matchPassword(password)
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        let token = generateToken(user._id)
        let cookieOption = {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',

        }



        res.cookie("token", token, cookieOption)
            .status(200)
            .json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                }
            })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🟡 Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = async (req, res) => {
    return res.clearCookie("token").status(200).json({ message: "logout successfully" })

}



const updateProfile = async (req, res) => {
    const { name, email } = req.body
    if (!name && !email) {
        return res.status(404).json({ "message": " name or email is required" })

    }

    const user = await User.findById(req.user.id)
    if (!user) {

        return res.status(404).json({ message: "user not found" })

    }

    const updatedUser = await User.findOneAndUpdate(req.user.id, { $set: { name, email } }, { new: true })


    res.status(200).json({ updatedUser, message: "user updated" })


}

const changePassword = async (req, res) => {
    const { oldpassword, newpassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(oldpassword);

    if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
    }

    // This triggers pre("save") hook automatically
    user.password = newpassword;

    await user.save();

    return res.status(200).json({
        message: "Password updated successfully"
    });
};
export { registerUser, loginUser, logoutUser, getUserProfile, updateProfile, changePassword }
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signUpSchema, loginSchema } from "./userValidation";
import User from "../../models/User";
import envConfig from "../../config/envConfig";

const signUp = async (req: Request, res: Response) => {
    try {
        // Validate input
        const { error, value } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ emailId: value.emailId });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const user = new User({ ...value, password: hashedPassword });
        await user.save();

        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ message: "User created successfully", user: userObj });
    } catch (error: any) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        // Validate input
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Find user
        const user = await User.findOne({ emailId: value.emailId });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, emailId: user.emailId },
            envConfig.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error: any) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export { signUp, login };
import { Request, Response  } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, {IUser}from "../Models/UserModel";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedpassword,
            role: req.body.role || "user"
        });

        const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET!, { expiresIn: "1d" });

        res.status(201).json({ 
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("REGISTERED ERROR:", error);
        res.status(500).json({ message: "Register failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { 
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET!, { expiresIn: "1d" });
        res.json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Login failed" });
    }
};
    

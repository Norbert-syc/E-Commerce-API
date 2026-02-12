import {Request , Response} from 'express';
import User from "../Models/UserModel";
import mongoose from "mongoose";

export const updateUserRole = async (req: Request, res: Response) => {
    try{
        const { id} = req.params;
        const { role } = req.body;

        if (!["user", "admin", "vendor"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User role updated successfully",
            user:{
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const fixCategoryIndex = async (req: Request, res: Response) => {
    try {
        if (mongoose.connection.db) {
            await mongoose.connection.db.collection('categories').dropIndex('id_1');
            return res.json({ message: "Index id_1 dropped successfully" });
        }
        res.status(500).json({ message: "Database connection not available" });
    } catch (error: any) {
        if (error.code === 27) {
            return res.json({ message: "Index id_1 does not exist" });
        }
        console.error(error);
        res.status(500).json({ message: "Failed to drop index" });
    }
};
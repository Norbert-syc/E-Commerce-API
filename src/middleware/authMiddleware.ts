import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    role: "user" | "admin" | "vendor";
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: "user" | "admin" | "vendor";
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch  {
        return res.status(401).json({ message: "Invalid token" });
    }
};

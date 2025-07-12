import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";

export interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("-- Auth Middleware --", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;

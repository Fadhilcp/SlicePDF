import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { JwtPayload } from "../types/jwtPayload.type";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;

        if(!authHeader?.startsWith("Bearer ")){
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token, env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}
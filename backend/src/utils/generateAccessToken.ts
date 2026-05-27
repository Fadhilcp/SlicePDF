import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { JwtPayload } from "../types/jwtPayload.type";


const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRE = env.ACCESS_TOKEN_EXPIRE;

if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is missing");
if (!ACCESS_TOKEN_EXPIRE) throw new Error("ACCESS_TOKEN_EXPIRE is missing");

export const generateAccessToken = (payload: JwtPayload) => {
    return jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE as jwt.SignOptions["expiresIn"] }
    );
};
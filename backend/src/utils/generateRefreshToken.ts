import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

interface RefreshTokenPayload {
  userId: string;
}

const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRE = env.REFRESH_TOKEN_EXPIRE;

if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is missing");

if (!REFRESH_TOKEN_EXPIRE) throw new Error("REFRESH_TOKEN_EXPIRE is missing");

export const generateRefreshToken = (payload: RefreshTokenPayload) => {
    return jwt.sign(
        payload,
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRE as jwt.SignOptions["expiresIn"] }
    );
};
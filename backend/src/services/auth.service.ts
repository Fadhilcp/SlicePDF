import { env } from "../config/env.config";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { RefreshPayload } from "../types/jwtPayload.type";
import { IUserDocument } from "../types/user.types";
import { generateAccessToken } from "../utils/generateAccessToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";
import { IAuthService } from "./interfaces/IAuthService";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
    constructor(
        private _userRepository: IUserRepository
    ){}

    async login(email: string, password: string)
    : Promise<{ user: Partial<IUserDocument>, accessToken: string, refreshToken: string }> {

        const user = await this._userRepository.findByEmail(email);

        if(!user){
            throw new Error("User not found");
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error("Invalid credentials");
        }

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            email: user.email,
        });

        const refreshToken = generateRefreshToken({
            userId: user._id.toString()
        });

        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken
        };
    }

    async register(name: string, email: string, password: string, confirmPassword: string)
    : Promise<{ user: Partial<IUserDocument>; accessToken: string; refreshToken: string; }> {
        
        const existingUser = await this._userRepository.findByEmail(email);

        if(existingUser) throw new Error("User already exists");

        if(password !== confirmPassword){
            throw new Error("Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await this._userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        const accessToken = generateAccessToken({
            userId: createdUser._id.toString(),
            email: createdUser.email,
        });

        const refreshToken = generateRefreshToken({
            userId: createdUser._id.toString(),
        });

        return {
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
            },
            accessToken,
            refreshToken
        };
    }

    async refreshToken(refreshToken: string)
    : Promise<{ user: Partial<IUserDocument>; accessToken: string; newRefreshToken: string; }> {

        if(!env.REFRESH_TOKEN_SECRET){
            throw new Error("REFRESH_TOKEN_SECRET missing");
        }

        const decoded = jwt.verify(
            refreshToken, env.REFRESH_TOKEN_SECRET
        ) as RefreshPayload;

        const user = await this._userRepository.findById(decoded.userId);

        if(!user) throw new Error("User not found");

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            email: user.email,
        });

        const newRefreshToken = generateRefreshToken({
            userId: user._id.toString(),
        });

        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            accessToken, newRefreshToken
        };
    }
}
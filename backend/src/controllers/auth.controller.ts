import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { clearCookie, setCookie } from "../utils/cookie";

export class AuthController {
    constructor(private _authService: IAuthService){}


    async login(req: Request, res: Response, next: NextFunction){
        try {
            
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required" });
            }

            const { user, accessToken, refreshToken } = await this._authService.login(email, password);

            setCookie(res, refreshToken);

            return res.status(200).json({ user, accessToken, success: true, message: "Login successful" });
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction){
        try {
            
            const { name, email, password, confirmPassword } = req.body;

            if(!name || !email || !password || !confirmPassword){
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const { user, accessToken, refreshToken } = await this._authService.register(name, email, password, confirmPassword);

            setCookie(res, refreshToken);

            return res.status(201).json({ user, accessToken, success: true, message: "Registration successfull" });
        } catch (error) {
            next(error);
        }
    }
    
    async refreshToken(req: Request, res: Response, next: NextFunction){
        try {
            
            const refreshToken = req.cookies.refreshToken;

            if(!refreshToken) {
                return res.status(401).json({
                    success: true, message: "Refresh token missing"
                });
            }

            const { user, accessToken, newRefreshToken } = await this._authService.refreshToken(refreshToken);

            setCookie(res, newRefreshToken);

            return res.status(200).json({
                success: true, message: "Token refreshed",
                user, accessToken
            });
        } catch (error) {
            clearCookie(res);
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try {
            clearCookie(res);

            return res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            next(error);
        }
    }
}
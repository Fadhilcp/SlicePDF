import { IUserDocument } from "../../types/user.types";

export interface IAuthService {
    login(email: string, password: string)
    : Promise<{ user: Partial<IUserDocument>, accessToken: string, refreshToken: string }>;

    register(name: string, email: string, password: string, confirmPassword: string)
    : Promise<{ user: Partial<IUserDocument>, accessToken: string, refreshToken: string }>;

    refreshToken(refreshToken: string)
    : Promise<{ user: Partial<IUserDocument>; accessToken: string; newRefreshToken: string; }>;
}
import api from "@/lib/axios";

class AuthService {
    async register(data: { name: string, email: string, password: string, confirmPassword: string }){
        return await api.post("/auth/register", data);
    }

    async login(data: { email: string, password: string }){
        return await api.post("/auth/login", data);
    }

    async refreshToken(){
        return await api.post("/auth/refresh");
    }

    async logout(){
        return await api.post("/auth/logout");
    }
}

export const authService = new AuthService();
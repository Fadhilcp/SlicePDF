import { logout, setCredentials } from "@/features/authReducer";
import { store } from "@/store/store";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token}`);

                const { user, accessToken } = response.data;

                store.dispatch(setCredentials({ user, accessToken }));

                originalRequest.headers.Authorization =`Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (error) {
                store.dispatch(logout());
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
import { logout, setAuthChecked, setCredentials } from "@/features/authReducer";
import { authService } from "@/services/auth.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuthVerifier = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authVerifier = async () => {
            
            dispatch(setAuthChecked(false)); 
            
            try {
                const response = await authService.refreshToken();

                if (response?.data?.success) {
                    dispatch(setCredentials({
                        user: response.data.user,
                        accessToken: response.data.accessToken
                    }));
                } else {
                    dispatch(logout());
                }
            } catch {
                await authService.logout()
                dispatch(logout());
            } finally {
                dispatch(setAuthChecked(true));
            }
        };

        authVerifier();
    }, [dispatch]);
};
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthChecked: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthChecked: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
            }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthChecked = true;
        },

        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthChecked = true;
        },
    },
});

export const { setCredentials, setAuthChecked, logout } = authSlice.actions;

export default authSlice.reducer;
"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "./AuthProvider";

export const StoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return (
        <Provider store={store}>
            <AuthProvider>

            {children}
            </AuthProvider>
        </Provider>
    );
};
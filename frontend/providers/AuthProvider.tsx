"use client";

import { useAuthVerifier } from "@/hooks/useAuthVerifier";

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
 
    useAuthVerifier();

    return children;
};
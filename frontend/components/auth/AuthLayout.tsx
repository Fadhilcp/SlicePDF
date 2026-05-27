import Link from "next/link";
import { IconScissors } from "@/components/icons/Icons";

interface AuthLayoutProps {
    children: React.ReactNode;
    // Position of the ambient glow - login uses top-right, register uses bottom-left
    glowPosition?: "top-right" | "bottom-left";
}

export const AuthLayout = ({ children, glowPosition = "top-right" }: AuthLayoutProps) => {
    const glowStyle =
    glowPosition === "top-right"
        ? { top: "-180px", right: "-180px", background: "radial-gradient(circle, rgba(232,93,42,0.08) 0%, transparent 70%)" }
        : { bottom: "-200px", left: "-150px", background: "radial-gradient(circle, rgba(232,93,42,0.07) 0%, transparent 70%)" };

    return (
        <div className="relative min-h-screen bg-surface-bg flex flex-col font-sans text-ink">

            {/* Noise overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Glow blob */}
            <div
                className="fixed w-150 h-150 rounded-full pointer-events-none z-0"
                style={{ ...glowStyle, animation: "fadeUp 1s ease both" }}
            />

            {/* Page content */}
            <div className="relative z-10 flex-1 flex justify-center px-6 py-12">
                {children}
            </div>

        </div>
    );
};
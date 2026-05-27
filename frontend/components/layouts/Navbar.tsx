"use client";

import { IconScissors } from "@/components/icons/Icons"
import { logout } from "@/features/authReducer";
import { authService } from "@/services/auth.service";
import { RootState } from "@/store/store";
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux";

export const Navbar = () => {
    const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async() => {
        try {
            await authService.logout();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(logout())
        }
    }
    return (
        <nav className="flex items-center justify-between px-10 h-16 border-b border-white/[0.07] bg-surface-nav backdrop-blur-md sticky top-0 z-50">

            <Link href="/" className="flex items-center gap-2.5 no-underline">
                <span className="text-brand flex items-center">
                    <IconScissors />
                </span>
                <span className="font-serif text-[1.35rem] text-ink-strong tracking-tight2">
                    Slice<span className="text-brand">PDF</span>
                </span>
            </Link>

            <div className="flex items-center gap-7">
                { !isAuthChecked && !user ? (
                    <div className="flex items-center gap-4 animate-pulse">
                        
                        {/* My Files skeleton */}
                        <div className="h-4 w-16 rounded bg-white/5" />

                        {/* User skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-20 rounded bg-white/5" />
                        </div>

                        {/* Button skeleton */}
                        <div className="h-9 w-20 rounded-md bg-white/5" />

                    </div>
                ) : user ? (
                    <>
                        <Link href="/my-files" className="text-ink-muted text-sm font-normal no-underline transition-colors duration-200 hover:text-ink">
                            My Files
                        </Link>
                        <div>{user.name}</div>
                        <button onClick={handleLogout} className="px-[1.1rem] py-[0.45rem] rounded-md bg-brand text-white text-sm font-medium no-underline transition-colors duration-200 hover:bg-brand-hover">
                            Logout
                        </button>
                    </>
                ): (
                    <Link href="/login" className="px-[1.1rem] py-[0.45rem] rounded-md bg-brand text-white text-sm font-medium no-underline transition-colors duration-200 hover:bg-brand-hover">
                        Get started
                    </Link>
                )}

            </div>

        </nav>
    )
}
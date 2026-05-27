"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMail, IconLock } from "@/components/icons/Icons";
import { AuthLayout, AuthCard, AuthField, AuthSubmitButton, AuthError } from "@/components/auth";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/features/authReducer";
import { RootState } from "@/store/store";
import Loader from "@/components/ui/Loader";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });

      if(response.data.success){
        const { user, accessToken } = response.data;
        dispatch(setCredentials({ user, accessToken }));
        router.push("/");
      }
    } catch (error: any){
      setError(error?.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthChecked && user) {
      router.replace("/");
    }
  }, [user, isAuthChecked, router]);

  if (!isAuthChecked) {
    return <Loader />;
  }
  if (user) {
    return <Loader />; 
  };

  return (
    <AuthLayout glowPosition="top-right">
      <AuthCard
        eyebrow="Welcome back"
        title={<>Sign in to<br />SlicePDF</>}
        subtitle={
          <>Don't have an account?{" "}
            <Link href="/register" className="text-brand no-underline font-medium hover:underline">
              Create one free
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[1.1rem]">

          <AuthField
            id="login-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
            icon={<IconMail />}
          />

          <AuthField
            id="login-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            required
            icon={<IconLock />}
            hint={
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-[0.775rem] text-ink/40 no-underline transition-colors duration-200 hover:text-brand"
                >
                  Forgot password?
                </Link>
              </div>
            }
          />

          <AuthError message={error} />

          <AuthSubmitButton
            isLoading={isLoading}
            label="Sign in"
            loadingLabel="Signing in…"
            className="mt-[0.4rem]"
          />

        </form>
      </AuthCard>
    </AuthLayout>
  );
}
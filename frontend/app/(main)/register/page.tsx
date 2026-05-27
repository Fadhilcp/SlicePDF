"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMail, IconLock, IconUser, IconShield } from "@/components/icons/Icons";
import { 
  AuthLayout, 
  AuthCard, 
  AuthField, 
  AuthSubmitButton, 
  AuthError, 
  PasswordMatchHint, 
  PasswordStrengthMeter 
} from "@/components/auth";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/features/authReducer";
import { RootState } from "@/store/store";
import Loader from "@/components/ui/Loader";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch()

  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);

  const passwordsMatch   = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields."); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters."); return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password, confirmPassword });

      if(response.data.success){
        const { user, accessToken } = response.data;

        dispatch(setCredentials({ user, accessToken }));
        router.push('/');
      }
    } catch (error: any){
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthChecked) return;

    if (user) {
      router.replace("/");
    }
  }, [user, isAuthChecked, router]);

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
    <AuthLayout glowPosition="bottom-left">
      <AuthCard
        eyebrow="Get started free"
        title={<>Create your<br />account</>}
        subtitle={
          <>Already have an account?{" "}
            <Link href="/login" className="text-brand no-underline font-medium hover:underline">
              Sign in
            </Link>
          </>
        }
        maxWidth="440px"
      >
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[1.1rem]">

          <AuthField
            id="reg-name"
            label="Full name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={setName}
            autoComplete="name"
            required
            icon={<IconUser />}
          />

          <AuthField
            id="reg-email"
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
            id="reg-password"
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
            icon={<IconLock />}
            hint={password ? <PasswordStrengthMeter password={password} /> : undefined}
          />

          <AuthField
            id="reg-confirm"
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            autoComplete="new-password"
            required
            icon={<IconLock />}
            inputClassName={
              passwordsMatch   ? "border-emerald-500/50" :
              passwordsMismatch ? "border-red-500/50"     : ""
            }
            hint={<PasswordMatchHint password={password} confirm={confirmPassword} />}
          />

          <AuthError message={error} />

          <AuthSubmitButton
            isLoading={isLoading}
            label="Create account"
            loadingLabel="Creating account…"
            className="mt-1"
          />

          {/* Terms */}
          <p className="text-[0.75rem] text-ink/30 leading-[1.6] text-center">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-ink/50 underline hover:text-brand">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-ink/50 underline hover:text-brand">Privacy Policy</Link>.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 pt-1">
            {["Encrypted", "No credit card", "Free forever"].map((label) => (
              <span key={label} className="flex items-center gap-[0.35rem] text-[0.72rem] text-ink/28">
                <IconShield /> {label}
              </span>
            ))}
          </div>

        </form>
      </AuthCard>
    </AuthLayout>
  );
}
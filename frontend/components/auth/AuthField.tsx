import { useState } from "react";
import { IconEye, IconEyeOff } from "@/components/icons/Icons";

export const inputBase =
  "w-full bg-white/4 border border-ink/10 rounded-[9px] py-[0.7rem] pl-10 text-ink-strong font-sans text-[0.9rem] outline-none transition-[border-color,background,box-shadow] duration-200 placeholder:text-ink/22 focus:border-brand focus:bg-brand/4 focus:shadow-[0_0_0_3px_rgba(232,93,42,0.1)]";

interface AuthFieldProps {
    id: string;
    label: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
    required?: boolean;
    icon: React.ReactNode;
    inputClassName?: string;
    hint?: React.ReactNode;
}

export const AuthField = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    autoComplete,
    required,
    icon,
    inputClassName = "",
    hint,
}: AuthFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
        <div className="flex flex-col gap-[0.4rem]">
            <label htmlFor={id} className="text-[0.775rem] font-medium text-ink/60 tracking-[0.03em] uppercase">
                {label}
            </label>

            <div className="relative flex items-center">
            {/* Left icon */}
            <span className="absolute left-3.25 text-ink/30 flex pointer-events-none transition-colors duration-200">
                {icon}
            </span>

            <input
                id={id}
                type={resolvedType}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={autoComplete}
                required={required}
                className={[
                inputBase,
                isPassword ? "pr-10" : "pr-[0.9rem]",
                inputClassName,
                ].join(" ")}
            />

            {/* Show / hide toggle — only for password fields */}
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 flex p-0.5 bg-transparent border-none text-ink/30 cursor-pointer transition-colors duration-200 hover:text-ink/70"
                >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
            )}
            </div>

            {/* Hint slot */}
            {hint}
        </div>
    );
};
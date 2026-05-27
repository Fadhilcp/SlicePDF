import { getPasswordStrength } from "@/utils/passwordStrength";

export const PasswordStrengthMeter = ({ password }: { password: string }) => {
        const strength = getPasswordStrength(password);
    return (
        <div className="flex items-center gap-[0.6rem] mt-[0.35rem]">
            <div className="flex gap-0.75 flex-1">
            {[1, 2, 3, 4].map((n) => (
                <div
                key={n}
                className="flex-1 h-0.75 rounded-full transition-colors duration-350"
                style={{ background: strength.score >= n ? strength.color : "rgba(255,255,255,0.08)" }}
                />
            ))}
            </div>
            <span
            className="text-[0.72rem] font-medium min-w-10 text-right transition-colors duration-350"
            style={{ color: strength.color }}
            >
            {strength.label}
            </span>
        </div>
    );
};
export const PasswordMatchHint = ({ password, confirm }: { password: string; confirm: string }) => {
    if (!confirm.length) return null;
    const match = password === confirm;
    return (
        <span className={`flex items-center gap-[0.35rem] text-[0.75rem] mt-[0.3rem] ${match ? "text-emerald-400" : "text-red-400"}`}>
            {match ? "✓ Passwords match" : "✗ Passwords don't match"}
        </span>
    );
};
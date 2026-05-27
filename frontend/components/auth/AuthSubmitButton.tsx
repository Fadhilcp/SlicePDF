import { IconLoader } from "@/components/icons/Icons";

interface AuthSubmitButtonProps {
    isLoading: boolean;
    loadingLabel: string;
    label: string;
    className?: string;
}

export const AuthSubmitButton = ({
    isLoading,
    loadingLabel,
    label,
    className = "",
}: AuthSubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className={[
                "w-full flex items-center justify-center gap-2 py-[0.8rem]",
                "bg-brand text-white border-none rounded-[9px]",
                "font-sans text-[0.95rem] font-semibold tracking-[0.01em] cursor-pointer",
                "transition-[background,transform,opacity] duration-200",
                "hover:enabled:bg-brand-hover active:enabled:scale-[0.985]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className,
            ].join(" ")}
        >
            {isLoading ? (
                <><IconLoader /> {loadingLabel}</>
            ) : (
                label
            )}
        </button>
    );
};
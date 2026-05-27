interface AuthErrorProps {
    message: string;
}

export const AuthError = ({ message }: AuthErrorProps) => {
    if (!message) return null;
    return (
        <p className="text-[0.825rem] text-red-400 bg-red-500/8 border border-red-500/20 rounded-[7px] px-[0.9rem] py-[0.6rem]">
            {message}
        </p>
    );
};
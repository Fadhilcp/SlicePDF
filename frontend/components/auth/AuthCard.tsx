interface AuthCardProps {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    children: React.ReactNode;
    maxWidth?: string;
}

export const AuthCard = ({
    eyebrow,
    title,
    subtitle,
    children,
    maxWidth = "420px",
}: AuthCardProps) => {
  return (
    <div className="w-full" style={{ maxWidth, animation: "fadeUp 0.55s ease both" }}>

      {/* Header */}
      <div className="mb-9">
        <span className="block text-[0.72rem] font-medium tracking-[0.14em] uppercase text-brand mb-[0.65rem]">
          {eyebrow}
        </span>
        <h1 className="font-serif text-[2.1rem] text-ink-strong tracking-[-0.03em] leading-[1.1] mb-[0.55rem]">
          {title}
        </h1>
        <p className="text-sm text-ink/45 font-light leading-[1.6]">
          {subtitle}
        </p>
      </div>

      {/* Gradient divider */}
      <div
        className="h-px mb-8"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      {/* Form content */}
      {children}

    </div>
  );
};
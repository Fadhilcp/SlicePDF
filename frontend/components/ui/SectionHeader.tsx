const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center gap-3 mb-5">
    <h2 className="font-serif text-[1.25rem] text-ink-strong tracking-tight2">{title}</h2>
    {count > 0 && (
      <span className="text-[0.72rem] font-medium text-ink/40 bg-white/5 border border-ink/10 px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
    <div className="flex-1 h-px bg-gradient-to-r from-ink/10 to-transparent ml-1" />
  </div>
);

export default SectionHeader;
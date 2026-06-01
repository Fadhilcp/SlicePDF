import Link from "next/link";
import { IconUploadCloud } from "../icons/Icons";

const EmptyOriginals = () => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-ink/10 rounded-2xl bg-white/[0.015]">
    <div className="w-16 h-16 rounded-2xl bg-brand/8 border border-brand/15 flex items-center justify-center text-brand/50 mb-4">
      <IconUploadCloud />
    </div>
    <h3 className="text-[0.95rem] font-medium text-ink-strong mb-1">No uploads yet</h3>
    <p className="text-[0.825rem] text-ink/40 mb-5 max-w-[240px]">
      Upload your first PDF to start slicing pages.
    </p>
    <Link
      href="/"
      className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-[0.825rem] font-semibold rounded-lg no-underline transition-colors duration-200 hover:bg-brand-hover"
    >
      Upload your first PDF
    </Link>
  </div>
);

export default EmptyOriginals;
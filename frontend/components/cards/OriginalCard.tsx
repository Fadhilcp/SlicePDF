import { OriginalFile } from "@/types/file.types";
import { IconCalendar, IconExternalLink, IconFile, IconHardDrive } from "../icons/Icons";
import Link from "next/link";
import { formatDate } from "@/utils/formateDate";

const OriginalCard = ({ file }: { file: OriginalFile }) => (
    <div className="group relative bg-white/[0.03] border border-ink/10 rounded-2xl p-5 flex gap-4 transition-all duration-300 hover:border-brand/40 hover:bg-brand/[0.03] hover:-translate-y-[2px]">

        {/* PDF icon block */}
        <div className="flex-shrink-0 w-12 h-14 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <IconFile size={24} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-[0.9rem] font-medium text-ink-strong truncate leading-snug" title={file.name}>
                {file.name}
                </h3>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-[0.75rem] text-ink/40">
                    <IconCalendar /> {formatDate(file.createdAt)}
                </span>
                <span className="flex items-center gap-1.5 text-[0.75rem] text-ink/40">
                    <IconHardDrive /> {file.size}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Link
                    href={`/?fileId=${file._id}`}
                    className="flex items-center gap-1.5 px-3 py-[0.4rem] bg-brand text-white text-[0.78rem] font-semibold rounded-lg no-underline transition-colors duration-200 hover:bg-brand-hover"
                    >
                    Slice again
                </Link>
                <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.openUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-[0.4rem] bg-white/5 border border-ink/10 text-ink/60 text-[0.78rem] font-medium rounded-lg transition-all duration-200 hover:border-ink/25 hover:text-ink cursor-pointer">
                    <IconExternalLink /> Open PDF
                </a>
            </div>
        </div>
    </div>
);

export default OriginalCard;
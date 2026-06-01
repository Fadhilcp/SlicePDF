import { GeneratedFile } from "@/types/file.types";
import { IconCalendar, IconDownload, IconFile } from "../icons/Icons";
import { formatDate } from "@/utils/formateDate";

const GeneratedCard = ({ file }: { file: GeneratedFile }) => (
    <div className="group bg-white/[0.025] border border-ink/[0.08] rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:border-ink/20 hover:bg-white/[0.04]">

        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
        <IconFile size={18} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[0.85rem] font-medium text-ink-strong truncate">{file.name}</span>
                <span className="flex-shrink-0 text-[0.62rem] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-[1px] rounded-full">
                    Generated
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-[0.73rem] text-ink/40 flex items-center gap-1">
                    <IconCalendar /> {formatDate(file.createdAt)}
                </span>
                <span className="text-[0.73rem] text-ink/40">
                    Pages: <span className="text-ink/60 font-medium">{file.pages.join(", ")}</span>
                </span>
                <span className="text-[0.73rem] text-ink/40">{file.size}</span>
            </div>
        </div>

        {/* Download */}
        <a href={`${process.env.NEXT_PUBLIC_API_URL}${file.downloadUrl}`}
            download
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-[0.4rem] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[0.78rem] font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-500/20 cursor-pointer">
            <IconDownload /> Download
        </a>
    </div>
);

export default GeneratedCard;
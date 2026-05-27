import { IconGithub, IconScissors } from "../icons/Icons"

export const Footer = () => {
    return (
        <footer className="border-t border-white/6 px-10 py-8 flex items-center justify-between flex-wrap gap-4">

            <div>
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <span className="text-brand flex">
                        <IconScissors />
                    </span>
                    <span className="font-serif text-base text-[rgba(240,237,232,0.5)]">
                        Slice<span className="text-brand">PDF</span>
                    </span>
                </div>

                {/* Copyright */}
                <p className="text-[0.78rem] text-ink/30 mt-0.5">
                    © {new Date().getFullYear()} SlicePDF. All rights reserved.
                </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
                <a href="#" className="text-ink/35 text-[0.8rem] no-underline transition-colors duration-200 hover:text-ink/70 flex items-center gap-1.5">
                    Privacy
                </a>
                <span className="w-px h-3.5 bg-white/12" />
                <a href="#" className="text-ink/35 text-[0.8rem] no-underline transition-colors duration-200 hover:text-ink/70 flex items-center gap-1.5">
                    Terms
                </a>
                <span className="w-px h-3.5 bg-white/12" />
                <a href="#" className="text-ink/35 text-[0.8rem] no-underline transition-colors duration-200 hover:text-ink/70 flex items-center gap-1.5">
                    <IconGithub /> GitHub
                </a>
            </div>

        </footer>
    )
}
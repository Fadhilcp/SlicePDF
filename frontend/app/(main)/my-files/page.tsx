"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconCalendar, IconDownload, IconExternalLink, IconFile, IconFilePlus, IconHardDrive, IconLayers, IconScissors, IconUploadCloud } from "@/components/icons/Icons";
import { pdfService } from "@/services/pdf.service";
import Loader from "@/components/ui/Loader";

// ── Types ─────────────────────────────────────────────────────────────────────
interface OriginalFile {
  _id: string;
  name: string;
  createdAt: string;
  size: string;
}

interface GeneratedFile {
  _id: string;
  name: string;
  pages: number[];
  createdAt: string;
  size: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ── Original File Card ────────────────────────────────────────────────────────
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
        <button className="flex items-center gap-1.5 px-3 py-[0.4rem] bg-white/5 border border-ink/10 text-ink/60 text-[0.78rem] font-medium rounded-lg transition-all duration-200 hover:border-ink/25 hover:text-ink cursor-pointer">
          <IconExternalLink /> Open PDF
        </button>
      </div>
    </div>
  </div>
);

// ── Generated File Card ───────────────────────────────────────────────────────
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
    <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-[0.4rem] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[0.78rem] font-semibold rounded-lg transition-all duration-200 hover:bg-emerald-500/20 cursor-pointer">
      <IconDownload /> Download
    </button>
  </div>
);

// ── Empty States ──────────────────────────────────────────────────────────────
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

const EmptyGenerated = () => (
  <div className="flex flex-col items-center justify-center py-10 px-6 text-center border border-dashed border-ink/[0.07] rounded-xl">
    <div className="w-12 h-12 rounded-xl bg-white/4 border border-ink/10 flex items-center justify-center text-ink/25 mb-3">
      <IconFilePlus />
    </div>
    <p className="text-[0.825rem] text-ink/35">
      No generated PDFs yet — slice an upload to create one.
    </p>
  </div>
);

// ── Section header ────────────────────────────────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MyFilesPage() {

  const [originals, setOriginals] = useState<OriginalFile[]>([]);
  const [generated, setGenerated] = useState<GeneratedFile[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchFiles(){
      try {
        setIsLoading(true);
        setError("");

        const response = await pdfService.getMyFiles();

        if(response.data.success){
          const { originals, generated } = response.data.files;

          setOriginals(originals);
          setGenerated(generated);
        }
      } catch (error: any) {
        setError(error?.response?.data?.message || "Failed to load files.")
      } finally {
        setIsLoading(false);
      }
    }

    fetchFiles();
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-red-400 text-sm">
          {error}
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface-bg font-sans text-ink">

      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(232,230,225,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,230,225,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div
        className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232,93,42,0.06) 0%, transparent 70%)",
          top: "-100px", right: "-100px",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto px-6 py-12">

        {/* ── Page header ── */}
        <div className="mb-10" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-brand mb-2">
                Dashboard
              </p>
              <h1 className="font-serif text-[2.4rem] text-ink-strong tracking-[-0.03em] leading-[1.05]">
                My Files
              </h1>
              <p className="text-[0.875rem] text-ink/45 font-light mt-1.5">
                Manage your uploaded and generated PDFs
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-[0.85rem] font-semibold rounded-xl no-underline transition-colors duration-200 hover:bg-brand-hover"
            >
              <IconScissors /> New upload
            </Link>
          </div>

          {/* Stats row */}
          {(originals.length > 0 || generated.length > 0) && (
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/6">
              <div>
                <p className="text-[1.4rem] font-serif text-ink-strong">{originals.length}</p>
                <p className="text-[0.72rem] text-ink/40 mt-0.5">Uploads</p>
              </div>
              <div className="w-px h-8 bg-ink/10" />
              <div>
                <p className="text-[1.4rem] font-serif text-ink-strong">{generated.length}</p>
                <p className="text-[0.72rem] text-ink/40 mt-0.5">Generated</p>
              </div>
              <div className="w-px h-8 bg-ink/10" />
              <div>
                <p className="text-[1.4rem] font-serif text-ink-strong">
                  {generated.reduce((acc, g) => acc + g.pages.length, 0)}
                </p>
                <p className="text-[0.72rem] text-ink/40 mt-0.5">Pages sliced</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Section 1: Original Uploads ── */}
        <div className="mb-12" style={{ animation: "fadeUp 0.5s 0.1s ease both" }}>
          <SectionHeader title="Original Uploads" count={originals.length} />
          {originals.length === 0 ? (
            <EmptyOriginals />
          ) : (
            <div className="flex flex-col gap-3">
              {originals.map((file) => (
                <OriginalCard key={file._id} file={file} />
              ))}
            </div>
          )}
        </div>

        {/* ── Section 2: Generated PDFs ── */}
        <div style={{ animation: "fadeUp 0.5s 0.2s ease both" }}>
          <SectionHeader title="Generated PDFs" count={generated.length} />
          {generated.length === 0 ? (
            <EmptyGenerated />
          ) : (
            <div className="flex flex-col gap-2.5">
              {generated.map((file) => (
                <GeneratedCard key={file._id} file={file} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
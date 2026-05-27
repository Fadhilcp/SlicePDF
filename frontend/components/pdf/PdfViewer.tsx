"use client"; 

import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfService } from "@/services/pdf.service";
import { IconDownload, IconLoader, IconScissorsSlice } from "../icons/Icons";
 
// Point pdfjs to the worker bundled with pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type GenerateStatus = "idle" | "loading" | "success" | "error";
 
interface PdfViewerProps {
    pdfUrl: string;
    fileId: string;
}

export const PdfViewer = ({ pdfUrl, fileId }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [generateStatus, setGenerateStatus] = useState<GenerateStatus>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}${pdfUrl}`;
 
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);

    setSelected(new Set(Array.from({ length: numPages }, (_, i) => i + 1)));
  };
 
  const togglePage = useCallback((page: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(page) ? next.delete(page) : next.add(page);
      return next;
    });
  }, []);
 
  const toggleAll = () => {
    if (selected.size === numPages) {
      setSelected(new Set());
    } else {
      setSelected(new Set(Array.from({ length: numPages }, (_, i) => i + 1)));
    }
  };
 
  const handleGenerate = async () => {
    if (selected.size === 0) return;
    setGenerateStatus("loading");
    try {
      const pages = Array.from(selected).sort((a, b) => a - b);
      const res = await pdfService.extractPdf({ pdfId: fileId, selectedPages: pages });
      if (!res.data.success) throw new Error("Generate failed");
      setDownloadUrl(res.data.downloadUrl ?? "");
      setGenerateStatus("success");
    } catch {
      setGenerateStatus("error");
    }
  };
 
  const allSelected = selected.size === numPages && numPages > 0;
  const noneSelected = selected.size === 0;
 
    return (
        <section
            className="w-full max-w-225 mx-auto mt-14 px-4"
            style={{ animation: "fadeUp 0.5s 0.1s ease both" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-7 pb-4 border-b border-white/[0.07]">
                <div className="flex items-baseline gap-3">
                    <h2 className="font-serif text-2xl text-ink-strong tracking-tight2">
                        Choose pages
                    </h2>
                    {numPages > 0 && (
                        <span className="text-[0.8rem] text-ink/40 font-normal">
                            {selected.size} of {numPages} selected
                        </span>
                    )}
                </div>
                {numPages > 0 && (
                    <button
                        className="bg-transparent border border-ink/15 text-ink/55 font-sans text-[0.8rem] font-medium px-[0.85rem] py-[0.35rem] rounded-md cursor-pointer transition-[border-color,color] duration-200 hover:border-ink/35 hover:text-ink"
                        onClick={toggleAll}
                    >
                        {allSelected ? "Deselect all" : "Select all"}
                    </button>
                )}
            </div>
 
            {/* PDF Document */}
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex items-center justify-center gap-3 py-16 text-ink/40 text-[0.9rem]">
                        <IconLoader /><span>Rendering pages…</span>
                    </div>
                }
                error={
                    <div className="text-center py-12 text-red-400 text-sm">
                        Failed to render PDF. Please try a different file.
                    </div>
                }
            >
                {/* Page grid */}
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                    {Array.from({ length: numPages }, (_, i) => {
                        const pageNum    = i + 1;
                        const isSelected = selected.has(pageNum);
                        return (
                            <button
                                key={pageNum}
                                onClick={() => togglePage(pageNum)}
                                aria-pressed={isSelected}
                                aria-label={`Page ${pageNum}${isSelected ? ", selected" : ""}`}
                                className={[
                                    "relative flex flex-col items-center gap-[0.65rem]",
                                    "p-3 pb-[0.6rem] rounded-xl border-[1.5px]",
                                    "font-sans text-center cursor-pointer",
                                    "transition-[border-color,background,transform] duration-200",
                                    isSelected
                                        ? "border-brand bg-brand/8 hover:border-brand-hover"
                                        : "border-ink/10 bg-white/3 hover:border-brand/45 hover:bg-brand/5 hover:-translate-y-0.5",
                                ].join(" ")}
                            >
                                {/* Thumbnail */}
                                <div className="page-thumb w-full rounded-md overflow-hidden bg-white/4 flex items-center justify-center leading-0">
                                    <Page
                                        pageNumber={pageNum}
                                        width={160}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                        loading={<div className="thumb-skeleton" />}
                                    />
                                </div>
 
                                {/* Page label */}
                                <span className={[
                                    "text-[0.75rem] font-medium -tracking-tight2",
                                    isSelected ? "text-brand/85" : "text-ink/45",
                                ].join(" ")}>
                                    Page {pageNum}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </Document>
 
            {/* Generate / Download bar */}
            {numPages > 0 && (
                <div className="mt-10 pt-6 border-t border-white/[0.07] flex items-center justify-end gap-4 flex-wrap">
                    {generateStatus === "error" && (
                        <span className="text-[0.825rem] text-red-400">Generation failed — please retry.</span>
                    )}
 
                    {generateStatus === "success" && downloadUrl ? (
                        <a
                            className="inline-flex items-center gap-2 px-6 py-[0.7rem] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-lg font-sans text-[0.9rem] font-semibold no-underline transition-colors duration-200 hover:bg-emerald-500/22"
                            href={`${process.env.NEXT_PUBLIC_API_URL}${downloadUrl}`}
                            download="sliced.pdf"
                        >
                            <IconDownload />
                            Download sliced PDF
                        </a>
                    ) : (
                        <button
                            className={[
                                "inline-flex items-center gap-2 px-6 py-[0.7rem]",
                                "bg-brand text-white border-none rounded-lg",
                                "font-sans text-[0.9rem] font-semibold cursor-pointer",
                                "transition-[background,transform,opacity] duration-200",
                                "hover:enabled:bg-brand-hover active:enabled:scale-[0.985]",
                                "disabled:opacity-40 disabled:cursor-not-allowed",
                                generateStatus === "loading" ? "animate-[pulse_1.4s_ease-in-out_infinite]" : "",
                            ].join(" ")}
                            onClick={handleGenerate}
                            disabled={noneSelected || generateStatus === "loading" || generateStatus === "success"}
                        >
                            {generateStatus === "loading" ? (
                                <><IconLoader /> Generating…</>
                            ) : (
                                <><IconScissorsSlice /> Slice {selected.size} page{selected.size !== 1 ? "s" : ""}</>
                            )}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};
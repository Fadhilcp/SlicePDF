"use client";

import { UploadStatus } from "@/types/pdf.types";
import { IconCheck, IconFile, IconLoader, IconUpload, IconX } from "../icons/Icons";
import { useCallback, useRef, useState } from "react";
import { pdfService } from "@/services/pdf.service";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";

const statusConfig = {
    idle: null,
    uploading: { label: "Uploading…", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    success: { label: "Upload complete", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
    error: { label: "Upload failed", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

interface UploadZoneProps {
    onUploadSuccess?: (data: {
        fileId: string;
        pdfUrl: string;
    }) => void;

    onFileClear?: () => void;
}

export const UploadZone = ({ onUploadSuccess, onFileClear }: UploadZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const router = useRouter();

    const user = useSelector((state: RootState) => state.auth.user);

    const acceptFile = useCallback((f: File | null) => {
        if (!f) return;
        if (f.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }
        setFile(f);
        setUploadStatus("idle");
    }, []);

    // Drag handlers
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        acceptFile(e.dataTransfer.files[0]);
    };
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => acceptFile(e.target.files?.[0] || null);

    const handleUpload = async () => {
        if (!file) return;

        if (!user) {
            router.push("/login");
            return;
        }

        setIsUploading(true);
        setUploadStatus("uploading");
        try {
            const formData = new FormData();
            formData.append("pdf", file);

            const res = await pdfService.uploadPdf(formData);
            if (!res.data.success) throw new Error("Server error");
            setUploadStatus("success");
            onUploadSuccess?.({
                fileId: res.data.pdf.id,
                pdfUrl: res.data.pdfUrl,
            });
        } catch {
            setUploadStatus("error");
        } finally {
            setIsUploading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setUploadStatus("idle");
        if (inputRef.current) inputRef.current.value = "";
        onFileClear?.();
    };

    const status = statusConfig[uploadStatus];
    const fmt = (bytes: number) => bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    const dropzoneState = file
        ? "border-solid border-ink/[0.18] cursor-default"
        : isDragging
        ? "border-solid border-brand bg-brand/5 shadow-[inset_0_0_0_2px_rgba(232,93,42,0.3)] cursor-pointer"
        : "border-dashed border-ink/20 bg-white/[0.025] hover:border-brand hover:bg-brand/5 cursor-pointer";

    return (
        <>
            {isUploading && <Loader />}

            {/* Drop Zone wrapper */}
            <div className="w-full max-w-115" style={{ animation: "fadeUp .6s .08s ease both" }}>
 
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    onChange={onInputChange}
                />
 
                <div
                    className={[
                        "relative w-full aspect-square min-h-85",
                        "border-[1.5px] rounded-2xl",
                        "flex flex-col items-center justify-center gap-4",
                        "transition-[border-color,background] duration-250 overflow-hidden",
                        dropzoneState,
                    ].join(" ")}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => !file && inputRef.current?.click()}
                    role="button"
                    tabIndex={file ? -1 : 0}
                    onKeyDown={(e) => !file && e.key === "Enter" && inputRef.current?.click()}
                    aria-label="PDF upload area"
                >
                    {file ? (
                        <>
                            {/* Clear button */}
                            <button
                                className="absolute top-3.5 right-3.5 bg-white/8 border-none rounded-full w-7 h-7 flex items-center justify-center cursor-pointer text-ink/60 transition-[background,color] duration-200 hover:bg-red-500/20 hover:text-red-400"
                                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                aria-label="Remove file"
                            >
                                <IconX />
                            </button>
 
                            {/* File info */}
                            <div className="flex flex-col items-center gap-4 p-6 w-full">
                                <span className="text-brand opacity-90"><IconFile /></span>
                                <span className="text-[0.95rem] font-medium text-ink-strong text-center break-all max-w-85">
                                    {file.name}
                                </span>
                                <span className="text-[0.8rem] text-ink/40">{fmt(file.size)}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className={`transition-colors duration-250 ${isDragging ? "text-brand" : "text-ink/30"}`}>
                                <IconUpload />
                            </span>
                            <div className="text-center">
                                <p className="text-[1rem] font-medium text-ink">
                                    Drop your PDF here, or{" "}
                                    <span className="text-brand underline cursor-pointer">browse</span>
                                </p>
                                <p className="text-[0.825rem] text-ink/40 mt-1">Drag &amp; drop supported</p>
                            </div>
                            <p className="text-[0.75rem] text-ink/30 mt-1 tracking-[0.03em]">
                                PDF files only · Max 100 MB
                            </p>
                        </>
                    )}
                </div>
            </div>
 
            {/* Actions */}
            <div className="w-full max-w-115 mt-5 flex flex-col gap-3.5" style={{ animation: "fadeUp .65s .16s ease both" }}>
 
                {/* Status bar */}
                {status && (
                    <div
                        className="flex items-center gap-[0.6rem] px-4 py-[0.6rem] rounded-lg text-sm font-medium"
                        style={{ background: status.bg, color: status.color }}
                    >
                        {uploadStatus === "uploading" && <IconLoader />}
                        {uploadStatus === "success"   && <IconCheck />}
                        {status.label}
                    </div>
                )}
 
                {/* Upload button */}
                <button
                    className={[
                        "w-full py-3 px-5 bg-brand text-white border-none rounded-[10px]",
                        "font-sans text-[0.95rem] font-semibold tracking-[0.01em]",
                        "flex items-center justify-center gap-[0.6rem]",
                        "transition-[background,transform,opacity] duration-200",
                        "hover:enabled:bg-brand-hover active:enabled:scale-[0.985]",
                        "disabled:opacity-45 disabled:cursor-not-allowed",
                        uploadStatus === "uploading" ? "animate-[pulse_1.4s_ease-in-out_infinite]" : "",
                    ].join(" ")}
                    onClick={handleUpload}
                    disabled={!file || uploadStatus === "uploading" || uploadStatus === "success"}
                >
                    {uploadStatus === "uploading" ? (
                        <><IconLoader /> Uploading…</>
                    ) : uploadStatus === "success" ? (
                        <><IconCheck /> Uploaded — choose pages next</>
                    ) : (
                        "Upload PDF"
                    )}
                </button>
            </div>
        </>
    );
}
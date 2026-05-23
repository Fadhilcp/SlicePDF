"use client";

import { UploadStatus } from "@/types/pdf.types";
import { IconCheck, IconFile, IconLoader, IconUpload, IconX } from "../icons/Icons";
import { useCallback, useRef, useState } from "react";
import { pdfService } from "@/services/pdf.service";

const statusConfig = {
    idle: null,
    uploading: { label: "Uploading…", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    success: { label: "Upload complete", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
    error: { label: "Upload failed", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

interface UploadZoneProps {
    onFileAccepted?: (file: File) => void;
    onUploadSuccess?: (fileId: string) => void;
    onFileClear?: () => void;
}

export const UploadZone = ({ onFileAccepted, onUploadSuccess, onFileClear }: UploadZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const acceptFile = useCallback((f: File | null) => {
        if (!f) return;
        if (f.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }
        setFile(f);
        setUploadStatus("idle");
        onFileAccepted?.(f)
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
        setUploadStatus("uploading");
        try {
            const formData = new FormData();
            formData.append("pdf", file);

            const res = await pdfService.uploadPdf(formData);
            if (!res.data.success) throw new Error("Server error");
            setUploadStatus("success");
            onUploadSuccess?.(res.data.pdf.id ?? "");
        } catch {
            setUploadStatus("error");
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

    return (
        <>
            {/* Drop Zone */}
            <div className="dropzone-wrap">
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden-input"
                    onChange={onInputChange}
                />
                <div
                    className={`dropzone${isDragging ? " drag" : ""}${file ? " has-file" : ""}`}
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
                        <button className="file-clear" onClick={(e) => { e.stopPropagation(); clearFile(); }} aria-label="Remove file">
                        <IconX />
                        </button>
                        <div className="file-preview">
                            <span className="file-icon-wrap"><IconFile /></span>
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{fmt(file.size)}</span>
                        </div>
                    </>
                    ) : (
                    <>
                        <span className="dz-icon"><IconUpload /></span>
                        <div style={{ textAlign: "center" }}>
                            <p className="dz-primary">
                                Drop your PDF here, or{" "}
                                <span className="dz-browse">browse</span>
                            </p>
                            <p className="dz-secondary" style={{ marginTop: "4px" }}>Drag &amp; drop supported</p>
                        </div>
                        <p className="dz-formats">PDF files only · Max 100 MB</p>
                    </>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="actions">
                {status && (
                    <div
                    className="status-bar"
                    style={{ background: status.bg, color: status.color }}
                    >
                        {uploadStatus === "uploading" && <IconLoader />}
                        {uploadStatus === "success" && <IconCheck />}
                        {status.label}
                    </div>
                )}
                <button
                    className={`upload-btn${uploadStatus === "uploading" ? " uploading" : ""}`}
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
    )
}
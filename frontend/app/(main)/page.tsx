"use client";

import { Hero } from "@/components/layouts/Hero"
import { UploadZone } from "@/components/pdf/UploadZone"
import dynamic from "next/dynamic";
import { useState } from "react";
const PdfViewer = dynamic(
  () => import("@/components/pdf/PdfViewer").then((mod) => mod.PdfViewer),
  { ssr: false }
);


export default function HomePage(){
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [fileId, setFileId] = useState<string>("");

    return (
        <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20">
 
            {/* Hero */}
            <Hero />
 
            {/* Upload zone */}
            <UploadZone
                onFileAccepted={(file) => {
                    setPdfFile(file);
                    setFileId("");
                }}
                onUploadSuccess={(id) => setFileId(id)}
                onFileClear={() => {
                    setPdfFile(null);
                    setFileId("");
                }}
            />
 
            {/* PDF viewer — shown only after upload succeeds */}
            {pdfFile && fileId && (
                <PdfViewer file={pdfFile} fileId={fileId} />
            )}
 
        </section>
    );
}
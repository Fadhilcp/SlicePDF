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
        <section className="main">
            {/* Hero */}
            <Hero/>

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

            {pdfFile && fileId && (
            <PdfViewer file={pdfFile} fileId={fileId} />
            )}

        </section>
    )
}
"use client";

import { IconUpload } from "@/components/icons/Icons";
import { Hero } from "@/components/layouts/Hero"
import { UploadZone } from "@/components/pdf/UploadZone"
import Loader from "@/components/ui/Loader";
import { pdfService } from "@/services/pdf.service";
import { RootState } from "@/store/store";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const PdfViewer = dynamic(
  () => import("@/components/pdf/PdfViewer").then((mod) => mod.PdfViewer),
  { ssr: false }
);


export default function HomePage(){
    const [viewerData, setViewerData] = useState<{
        pdfUrl: string;
        fileId: string;
    } | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const searchParams = useSearchParams();

    const { isAuthChecked, user } = useSelector((state: RootState) => state.auth);

    const router = useRouter();

    const fileId = searchParams.get("fileId");



    useEffect(() => {
        if (!isAuthChecked) return;

    if (!fileId || !user) return;


        const fetchPdf = async () => {
            setIsLoading(true);
            try {
                const response = await pdfService.getPdfById(fileId);

                if (response.data.success) {
                    setViewerData({
                        fileId: response.data.pdf._id,
                        pdfUrl: response.data.pdf.url,
                    });

                    router.replace("/", { scroll: false });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPdf();
    }, [fileId]);

    if (isLoading) return <Loader />;

    return (
        <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20">
 
            {/* Hero — always visible */}
            <Hero />
 
            {viewerData ? (
                <>
                    {/* Reset button */}
                    <button
                        onClick={() => setViewerData(null)}
                        className="flex items-center gap-2 px-4 py-2 mb-8 bg-white/5 border border-ink/15 text-ink/60 text-[0.825rem] font-medium rounded-lg cursor-pointer transition-all duration-200 hover:border-brand/40 hover:text-brand hover:bg-brand/5"
                    >
                        <IconUpload />
                        Upload a different PDF
                    </button>
 
                    {/* PDF viewer */}
                    <PdfViewer
                        pdfUrl={viewerData.pdfUrl}
                        fileId={viewerData.fileId}
                    />
                </>
            ) : (
                /* Upload zone */
                <UploadZone
                    onUploadSuccess={(data) => {
                        setViewerData({
                            pdfUrl: data.pdfUrl,
                            fileId: data.fileId,
                        });
                    }}
                    onFileClear={() => setViewerData(null)}
                />
            )}
 
        </section>
    );
}
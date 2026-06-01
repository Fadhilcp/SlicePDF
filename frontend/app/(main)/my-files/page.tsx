"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconFilePlus, IconScissors, IconUploadCloud } from "@/components/icons/Icons";
import { pdfService } from "@/services/pdf.service";
import Loader from "@/components/ui/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { GeneratedFile, OriginalFile } from "@/types/file.types";
import GeneratedCard from "@/components/cards/GeneratedCard";
import OriginalCard from "@/components/cards/OriginalCard";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyGenerated from "@/components/ui/EmptyGenerated";
import EmptyOriginals from "@/components/ui/EmptyOriginals";






export default function MyFilesPage() {

  const [originals, setOriginals] = useState<OriginalFile[]>([]);
  const [generated, setGenerated] = useState<GeneratedFile[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, isAuthChecked } = useSelector((state: RootState) => state.auth);

  useEffect(() => {

    if (!isAuthChecked) return;

    if (!user) {
        setIsLoading(false);
        return;
    }

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
  }, [isAuthChecked, user]);

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-sm text-ink/50">
              Please login to view your files.
          </p>
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

        {/* Page header */}
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

        {/* Original Uploads */}
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

        {/* Generated PDFs */}
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
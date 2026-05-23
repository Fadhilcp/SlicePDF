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
  file: File;
  fileId: string;
}

export const PdfViewer = ({ file, fileId }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [generateStatus, setGenerateStatus] = useState<GenerateStatus>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
 
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
    <section className="viewer-section">
      {/* Section header */}
      <div className="viewer-header">
        <div className="viewer-header-left">
          <h2 className="viewer-title">Choose pages</h2>
          {numPages > 0 && (
            <span className="viewer-meta">
              {selected.size} of {numPages} selected
            </span>
          )}
        </div>
        <div className="viewer-header-right">
          {numPages > 0 && (
            <button className="btn-ghost" onClick={toggleAll}>
              {allSelected ? "Deselect all" : "Select all"}
            </button>
          )}
        </div>
      </div>
 
      {/* PDF page grid */}
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="doc-loading">
            <IconLoader />
            <span>Rendering pages…</span>
          </div>
        }
        error={
          <div className="doc-error">Failed to render PDF. Please try a different file.</div>
        }
      >
        <div className="pages-grid">
          {Array.from({ length: numPages }, (_, i) => {
            const pageNum = i + 1;
            const isSelected = selected.has(pageNum);
            return (
              <button
                key={pageNum}
                className={`page-card${isSelected ? " page-card--selected" : ""}`}
                onClick={() => togglePage(pageNum)}
                aria-pressed={isSelected}
                aria-label={`Page ${pageNum}${isSelected ? ", selected" : ""}`}
              >

                {/* Thumbnail */}
                <div className="page-thumb">
                  <Page
                    pageNumber={pageNum}
                    width={160}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    loading={<div className="thumb-skeleton" />}
                  />
                </div>
 
                {/* Page number */}
                <span className="page-num">Page {pageNum}</span>
              </button>
            );
          })}
        </div>
      </Document>
 
      {/* Slice and Download area */}
      {numPages > 0 && (
        <div className="generate-bar">
          {generateStatus === "error" && (
            <span className="gen-error">Generation failed — please retry.</span>
          )}
 
          {generateStatus === "success" && downloadUrl ? (
            <a className="btn-download" href={`${process.env.NEXT_PUBLIC_API_URL}${downloadUrl}`} download="sliced.pdf">
              <IconDownload />
              Download sliced PDF
            </a>
          ) : (
            <button
              className={`btn-generate${generateStatus === "loading" ? " btn-generate--loading" : ""}`}
              onClick={handleGenerate}
              disabled={noneSelected || generateStatus === "loading" || generateStatus === "success"}
            >
              {generateStatus === "loading" ? (
                <><IconLoader /> Generating…</>
              ) : (
                <>
                  <IconScissorsSlice />
                  Slice {selected.size} page{selected.size !== 1 ? "s" : ""}
                </>
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
};
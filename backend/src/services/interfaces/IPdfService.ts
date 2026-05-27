import { GeneratedFile, IPdfDocument, OriginalFile } from "../../types/pdf.types";

export interface IPdfService {
    uploadPdf(data: any): Promise<{ pdf: IPdfDocument, pdfUrl: string }>;

    extractPdf(pdfId: string, selectedPages: number[], userId: string)
    : Promise<{ pdf: IPdfDocument, downloadUrl: string; }>;

    getMyFiles(userId: string): Promise<{ originals: OriginalFile[], generated: GeneratedFile[] }>;
    getPdfById(pdfId: string): Promise<{ _id: string; url: string; originalName: string; }>;
}
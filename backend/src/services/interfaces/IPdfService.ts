import { GeneratedFile, IPdfDocument, OriginalFile } from "../../types/pdf.types";

export interface IPdfService {
    uploadPdf(data: any): Promise<IPdfDocument>;

    extractPdf(pdfId: string, selectedPages: number[], userId: string)
    : Promise<{ pdf: IPdfDocument, downloadUrl: string; }>;

    getMyFiles(userId: string): Promise<{ originals: OriginalFile[], generated: GeneratedFile[] }>;
}
import { IPdfDocument } from "../../types/pdf.types";

export interface IPdfService {
    uploadPdf(data: any): Promise<IPdfDocument>;
    // getUserPdfs(userId: string): Promise<IPdfDocument[]>;
    extractPdf(pdfId: string, selectedPages: number[],
        //  userId: string
        ): Promise<{ pdf: IPdfDocument, downloadUrl: string; }>;
}
import path from "path";
import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";
import { IPdfRepository } from "../repositories/interfaces/IPdfRepository";
import { IPdfDocument, UploadPdfDTO } from "../types/pdf.types";
import { IPdfService } from "./interfaces/IPdfService";

export class PdfService implements IPdfService {
    constructor(
        private _pdfRepository: IPdfRepository
    ){}

    async uploadPdf(data: UploadPdfDTO): Promise<IPdfDocument> {
        const createdPdf = await this._pdfRepository.create({
            // userId: data.userId,
            type: "original",
            originalName: data.originalName,
            storedName: data.storedName,
            fileSize: data.fileSize,
        })

        return createdPdf;
    }

    async extractPdf(
        pdfId: string, selectedPages: number[], 
        // userId: string
    ): Promise<{ pdf: IPdfDocument, downloadUrl: string; }> {
        
        const pdf = await this._pdfRepository.findById(pdfId);

        if(!pdf) throw new Error("PDF not found");

        const originalPath = path.join(
            process.cwd(),
            "src/uploads/originals",
            pdf.storedName
        );

        const existingPdfBytes = await fs.readFile(originalPath);

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const newPdf = await PDFDocument.create();

        const copiedPages = await newPdf.copyPages(
            pdfDoc,
            selectedPages.map(
                page => page - 1
            )
        );

        copiedPages.forEach(page => {
            newPdf.addPage(page);
        });

        const pdfBytes = await newPdf.save();

        const generateName = `${crypto.randomUUID()}.pdf`;

        const generatedPath = path.join(
            process.cwd(),
            "src/uploads/generated",
            generateName
        );

        await fs.writeFile(
            generatedPath,
            pdfBytes
        );

        const generatedPdf = await this._pdfRepository.create({
            type: "generated",
            originalName: "generated.pdf",
            storedName: generateName,
            parentPdfId: pdf._id,
            selectedPages
        });

        return { pdf: generatedPdf, downloadUrl: `/files/generated/${generateName}`};
    }    
}
import { NextFunction, Request, Response } from "express";
import { IPdfService } from "../services/interfaces/IPdfService";

export class PdfController {
    constructor(
        private _pdfService: IPdfService
    ){}

    async uploadPdf(req: Request, res: Response, next: NextFunction){
        try {
            
            const file = req.file;

            if(!file){
                return res.status(400).json({ success: false, message: "No file uploaded"});
            }

            const userId = req.user?.userId;

            const pdf = await this._pdfService.uploadPdf({
                userId,
                originalName: file.originalname,
                storedName: file.filename,
                fileSize: file.size
            });

            return res.status(201).json({ success: true, pdf: {
                    id: pdf._id,
                    originalName: pdf.originalName,
                    storedName: pdf.storedName,
                    fileSize: pdf.fileSize,
                    createdAt: pdf.createdAt,
                } 
            });

        } catch (error) {
            next(error);
        }
    }

    async extractPdf(req: Request, res: Response, next: NextFunction){
        try {
            
            const { pdfId, selectedPages } = req.body;

            const userId = req.user?.userId;

            if(!userId){
                return res.status(401).json({ message: "Unauthorized", success: false });
            }

            const { pdf, downloadUrl } = await this._pdfService.extractPdf(
                pdfId,
                selectedPages,
                userId
            );

            return res.status(200).json({ success: true, pdf, downloadUrl });
        } catch (error) {
            next(error);
        }
    }

    async getMyFiles(req: Request,res: Response,next: NextFunction) {
        try {

            const userId = req.user?.userId;

            if(!userId) {
                return res.status(401).json({ message: "Unauthorized", success: false });
            }

            const files = await this._pdfService.getMyFiles(userId);

            return res.status(200).json({
            success: true,
            files,
            });

        } catch (error) {
            next(error);
        }
    }
}
import { IPdfDocument } from "../types/pdf.types";
import { BaseRepository } from "./base.repository";
import { IPdfRepository } from "./interfaces/IPdfRepository";
import PDFModel from "../models/pdf.schema"

export class PdfRepository 
    extends BaseRepository<IPdfDocument> 
        implements IPdfRepository {

        constructor(){
            super(PDFModel)
        }

        async findByUserId(userId: string): Promise<IPdfDocument[]> {
            return await PDFModel.find({ userId });
        }

        async findGeneratedPdfs(userId: string): Promise<IPdfDocument[]> {
            return await PDFModel.find({ userId, type: "generated" });
        }
}
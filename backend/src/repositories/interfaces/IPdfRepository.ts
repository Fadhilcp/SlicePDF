import { IPdfDocument } from "../../types/pdf.types";
import { BaseRepository } from "../base.repository";

export interface IPdfRepository extends BaseRepository<IPdfDocument> {
    findByUserId(userId: string): Promise<IPdfDocument[]>;
    findGeneratedPdfs(userId: string): Promise<IPdfDocument[]>;
}
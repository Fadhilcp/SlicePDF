import { Document, Types } from "mongoose";

export interface IPdf {
    userId: Types.ObjectId | string;
    type: "original" | "generated";
    
    originalName: string;
    storedName: string;
    
    parentPdfId: Types.ObjectId | null;
    
    selectedPages: number[];
    fileSize?: number;
    
}
export interface IPdfDocument extends IPdf, Document {
    _id: Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}

export interface UploadPdfDTO {
  userId?: string;
  originalName: string;
  storedName: string;
  fileSize: number;
}

export interface OriginalFile {
    _id: string;
    name: string;
    createdAt: Date;
    size: string;
    openUrl: string;
}

export interface GeneratedFile {
    _id: string;
    name: string;
    pages: number[];
    createdAt: Date;
    size: string;
    downloadUrl: string;
}
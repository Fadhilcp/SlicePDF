import { IPdfDocument } from "../types/pdf.types";
import { GeneratedFile } from "../types/pdf.types";
import { formatFileSize } from "../utils/formatFileSize";

export const mapGeneratedFiles = (
    files: IPdfDocument[]
): GeneratedFile[] => {

    return files.map((file) => ({
        _id: file._id.toString(),
        name: file.originalName,
        pages: file.selectedPages,
        createdAt: file.createdAt,
        size: formatFileSize(file.fileSize || 0),
    }));
};

import { IPdfDocument } from "../types/pdf.types";
import { OriginalFile } from "../types/pdf.types";
import { formatFileSize } from "../utils/formatFileSize";

export const mapOriginalFiles = (
    files: IPdfDocument[]
): OriginalFile[] => {

    return files.map((file) => ({
        _id: file._id.toString(),
        name: file.originalName,
        createdAt: file.createdAt,
        size: formatFileSize(file.fileSize || 0),
        openUrl: `/files/originals/${file.storedName}`,
    }));
};
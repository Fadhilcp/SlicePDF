import { model, Schema } from "mongoose";
import { IPdfDocument } from "../types/pdf.types";

const pdfSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    type: {
        type: String,
        enum: ["original", "generated"],
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    storedName: {
        type: String,
        required: true,
        unique: true,
    },
    parentPdfId: {
        type: Schema.Types.ObjectId,
        ref: "PDF",
        default: null,
    },
    selectedPages: {
        type: [Number],
        default: [],
    },
    fileSize: {
        type: Number,
    },
}, { timestamps: true });

export default model<IPdfDocument>('PDF', pdfSchema);
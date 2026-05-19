import { model, Schema } from "mongoose";

const pdfSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["orignals", "generated"],
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
    seletedPages: {
        type: [Number],
        default: [],
    },
    fileSize: {
        type: Number,
    },
}, { timestamps: true });

export default model('PDF', pdfSchema);
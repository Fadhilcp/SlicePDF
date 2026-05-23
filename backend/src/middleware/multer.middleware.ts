import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads/originals");
    },

    filename(req, file, callback) {
        const uniqueName = 
        crypto.randomUUID() + 
        path.extname(file.originalname);

        callback(null, uniqueName);
    },
});

const fileFilter: multer.Options["fileFilter"] =
(req, file, callback) => {

    if (file.mimetype === "application/pdf") {
        callback(null, true);
    } else {
        callback(new Error("Only PDF files allowed"));
    }
};

export const uploadPdf = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
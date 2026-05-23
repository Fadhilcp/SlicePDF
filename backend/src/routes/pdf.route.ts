import { Router } from "express";
import { uploadPdf } from "../middleware/multer.middleware";
import { PdfRepository } from "../repositories/pdf.repository";
import { PdfService } from "../services/pdf.service";
import { PdfController } from "../controllers/pdf.controller";

const pdfRouter = Router();

const pdfRepository = new PdfRepository();
const pdfService = new PdfService(pdfRepository);
const pdfController = new PdfController(pdfService);


pdfRouter.post('/upload',uploadPdf.single("pdf"),pdfController.uploadPdf.bind(pdfController));
pdfRouter.post('/extract',pdfController.extractPdf.bind(pdfController));

export default pdfRouter;
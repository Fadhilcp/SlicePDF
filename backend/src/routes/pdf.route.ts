import { Router } from "express";
import { uploadPdf } from "../middleware/multer.middleware";
import { PdfRepository } from "../repositories/pdf.repository";
import { PdfService } from "../services/pdf.service";
import { PdfController } from "../controllers/pdf.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const pdfRouter = Router();

const pdfRepository = new PdfRepository();
const pdfService = new PdfService(pdfRepository);
const pdfController = new PdfController(pdfService);


pdfRouter.post('/upload',authMiddleware,uploadPdf.single("pdf"),pdfController.uploadPdf.bind(pdfController));
pdfRouter.post('/extract',authMiddleware,pdfController.extractPdf.bind(pdfController));
pdfRouter.get('/my-files',authMiddleware,pdfController.getMyFiles.bind(pdfController));
pdfRouter.get("/generated/:filename/download",pdfController.downloadGeneratedPdf.bind(pdfController));
pdfRouter.get('/:pdfId',authMiddleware,pdfController.getPdfById.bind(pdfController));

export default pdfRouter;
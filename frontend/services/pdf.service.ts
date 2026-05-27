import api from "@/lib/axios"

export class PdfService {
    async uploadPdf(formData: FormData) {
        return await api.post('/pdf/upload', formData, { 
            headers: {
                "Content-Type": "multipart/form-data", 
            }
        })
    }

    async extractPdf(data: { pdfId: string; selectedPages: number[] }){
        return await api.post('/pdf/extract', data);
    }

    async getMyFiles() {
        return await api.get("/pdf/my-files");
    }
}

export const pdfService = new PdfService();
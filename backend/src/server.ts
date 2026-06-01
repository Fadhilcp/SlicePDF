import express from 'express';
import { env } from './config/env.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/mongo.config';
import pdfRouter from './routes/pdf.route';
import { errorMiddleware } from './middleware/error.middleware';
import authRouter from './routes/auth.route';
import { ensureUploadDirectoriesExist } from './utils/ensureUploadDirectories';

const app = express();

ensureUploadDirectoriesExist();

connectDB();

app.use(cors({
    origin : env.CLIENT_URL,
    methods : env.CORS_METHODS?.split(","),
    allowedHeaders : env.CORS_ALLOWED_HEADERS?.split(","),
    credentials : env.CORS_CREDENTIALS === "true",
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/files",express.static("src/uploads"));

app.use("/api/pdf", pdfRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
    console.log(`server is running in http://localhost:${env.PORT}`)
})
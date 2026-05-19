import express from 'express';
import { env } from './config/env.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/mongo.config';

const app = express();

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

app.listen(env.PORT, () => {
    console.log(`server is running in http://localhost:${env.PORT}`)
})
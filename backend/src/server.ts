import express from 'express';
import { env } from './config/env.config';


const app = express();

app.listen(env.PORT, () => {
    console.log(`server is running in http://localhost:${env.PORT}`)
})
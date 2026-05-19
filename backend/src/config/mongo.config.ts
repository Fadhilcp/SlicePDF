import { env } from "./env.config";
import mongoose from "mongoose";

export function connectDB(){
    try {
        const uri = env.MONGO_DB_URI as string;
    
        mongoose.connect(uri);
        console.log("connected with MongoDB");
    } catch (error) {
        console.error("MongoDB connection error :",error);
        process.exit(1)
    }
}
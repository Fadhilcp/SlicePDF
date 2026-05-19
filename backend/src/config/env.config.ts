import dotenv from 'dotenv';

dotenv.config();

export const env = {
    get PORT(){
        return process.env.PORT;
    },
    get CLIENT_URL(){
        return process.env.CLIENT_URL;
    },
    get CORS_METHODS(){
        return process.env.CORS_METHODS;
    },
    get CORS_ALLOWED_HEADERS(){
        return process.env.CORS_ALLOWED_HEADERS;
    },
    get CORS_CREDENTIALS(){
        return process.env.CORS_CREDENTIALS;
    },
    get MONGO_DB_URI(){
        return process.env.MONGO_DB_URI;
    },
}
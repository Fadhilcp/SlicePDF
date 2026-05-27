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

    get ACCESS_TOKEN_SECRET(){
        return process.env.ACCESS_TOKEN_SECRET;
    },
    get REFRESH_TOKEN_SECRET(){
        return process.env.REFRESH_TOKEN_SECRET;
    },
    get ACCESS_TOKEN_EXPIRE(){
        return process.env.ACCESS_TOKEN_EXPIRE;
    },
    get REFRESH_TOKEN_EXPIRE(){
        return process.env.REFRESH_TOKEN_EXPIRE;
    },

    get NODE_ENV(){
        return process.env.NODE_ENV;
    },
    
    get COOKIE_MAX_AGE(){
        return process.env.COOKIE_MAX_AGE;
    },
    get COOKIE_SAME_SITE(){
        return process.env.COOKIE_SAME_SITE;
    },
}
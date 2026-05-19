import dotenv from 'dotenv';

dotenv.config();

export const env = {
    get PORT(){
        return process.env.PORT;
    }
}
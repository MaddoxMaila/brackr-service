import {Express, Request} from "express";
import {User, Apikey} from '../../libs/Db'

type USER = {
    user: User | null,
    api: Apikey | null 
}

declare global{
    namespace Express {
        interface Request {
            auth: USER | null,
        }
    }
}
declare namespace NodeJS {
    interface ProcessEnv {
        ACCESS_SECRET: string;
        PORT?: string;
        DATABASE_URL: string;
    }
}

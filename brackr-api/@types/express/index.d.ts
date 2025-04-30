import {Express, Request} from "express";
import {User, Apikey} from '../../libs/Db'


declare global{
    namespace Express {
        interface Request {
            user?: User;
            api?: Apikey;
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

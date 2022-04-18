import {Express, Request} from "express";

declare global{
    namespace Express {
        interface Request {
            user?: any,
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

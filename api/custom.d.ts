declare namespace Express {
    export interface Request {
        uid?: number
    }
}
declare namespace NodeJS {
    interface ProcessEnv {
        ACCESS_SECRET: string;
        PORT?: string;
        DATABASE_URL: string;
    }
}

import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../../libs/ApiResponse';


//for all other error
const ErrorMid = (e: Error, req: Request, res: Response, next: NextFunction) => {
    //console.log("error Middleware: ", e.code);
    // if (e.code !== 'EBADCSRFTOKEN') {
    //     return next(e);
    // }
    res.status(403).json(ApiResponse<Error>(true, e.message, e))
}
//for 404 error
const Error404Mid = (req: Request, res: Response) => {
    res.status(404).json(ApiResponse<Error>(true, "Not Found", {
        name: "404",
        message: "No Response Found!"
    }))
}


export default [ErrorMid, Error404Mid]
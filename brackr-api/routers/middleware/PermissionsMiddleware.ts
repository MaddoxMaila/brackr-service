import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../libs/ErrorResponse";


const UserTypes = {
    user: 'user',
    admin: 'admin',
    superadmin: 'superadmin',
    driver: 'driver'
}

export const AllAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try{
        console.log(req.user?.type)
        if(
            (req.user?.type != UserTypes.admin) ||
            (req.user?.type != UserTypes.superadmin)
        ) throw new Error("Permission denied, not an admin or a super admin.")

        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

export const SuperAdminMiddlware = (req: Request, res: Response, next: NextFunction) => {

    try{

        if(req.user?.type != UserTypes.superadmin) throw new Error("Permission denied, not a super admin.")
        
        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try{
        
        if(req.user?.type != UserTypes.admin) throw new Error("Permission denied, not an admin.")

        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

export const DriverMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try{
        
        if(req.user?.type != UserTypes.driver) throw new Error("Permission denied, not a driver.")

        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}
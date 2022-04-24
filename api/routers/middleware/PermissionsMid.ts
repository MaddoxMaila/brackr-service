import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../libs/ErrorResponse";


const UserTypes = {
    user: 'user',
    admin: 'admin',
    superadmin: 'superadmin'
}

const AllAdminMid = (req: Request, res: Response, next: NextFunction) => {

    try{

        if(
            (req.user?.type != UserTypes.admin) ||
            (req.user?.type != UserTypes.superadmin)
        ) throw new Error("Permission denied")

        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

const SuperAdminMid = (req: Request, res: Response, next: NextFunction) => {

    try{

        if(req.user?.type != UserTypes.superadmin) throw new Error("Permission denied")
        
        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

const AdminMid = (req: Request, res: Response, next: NextFunction) => {

    try{
        
        if(req.user?.type != UserTypes.admin) throw new Error("Permission denied")

        next()

    }catch(e: any){
        ErrorResponse(res, e)
    }

}

export {
    SuperAdminMid,
    AllAdminMid,
    AdminMid
}
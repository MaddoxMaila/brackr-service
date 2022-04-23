import { NextFunction, Request, Response } from "express";




const PermissionsMid = (req: Request, res: Response, next: NextFunction) => {

    try{

        

        next()

    }catch(e: any){

    }

}

export default PermissionsMid
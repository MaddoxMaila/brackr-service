import { Request, NextFunction, Response } from 'express'
import Define from '../../utils/Define';
import Helper from '../../utils/Helper'
import ApiResponse from '../../libs/ApiResponse';
import {db} from '../../libs/Db'


const AuthMid = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const headers = req.headers
        if(!headers['x-jwt']) throw new Error("Unauthorized Access")

        const token = headers['x-jwt'].toString()
        if (!token) throw new Error("Unauthorized Access")
        
        //token validation 
        const id = Helper.verifyJWTtoken(token)

        const user  = await db.user.findFirst({
            where: {
                id: parseInt(id)
            }
        })

        if(!user?.id) throw new Error("Authorized user does not exist")

        //set user email in request
        req.user = user
        
        next()
    } catch (e: any) {
        res.status(401).json(ApiResponse<Error>(true, e.message, e))
    }

}

export default AuthMid
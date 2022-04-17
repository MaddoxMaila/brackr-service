/**
 * @design by milon27
 */
import { Request, NextFunction, Response } from 'express'
import Define from './../../utils/Define';
import Helper from '../../utils/Helper'
import ApiResponse from '../../libs/ApiResponse';


const AuthMid = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies[Define.TOKEN]
        if (!token) {
            throw new Error("Unauthorized Access")
        }
        //token validation
        const id = Helper.verifyJWTtoken(token)
        console.log("authmid: ", id);

        //set user email in request
        req.uid = parseInt(id)
        next()
    } catch (e: any) {
        res.status(401).json(ApiResponse<Error>(true, e.message, e))
    }

}

export default AuthMid
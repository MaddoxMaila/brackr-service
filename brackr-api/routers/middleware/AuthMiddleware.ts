import { Request, NextFunction, Response } from 'express'
import Define from '../../utils/Define';
import Helper from '../../utils/Helper'
import ApiResponse from '../../libs/ApiResponse';
import {db} from '../../libs/Db'


const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let token: string | undefined;
        // Prefer standard Authorization header: "Bearer <token>"
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7).trim();
        } else if (req.headers['x-jwt']) {
            // Fallback to x-jwt header for backward compatibility
            token = req.headers['x-jwt'].toString();
        }

        if (!token) throw new Error("Unauthorized Access");

        // Token validation 
        const id = Helper.verifyJWTtoken(token)

        const user  = await db.user.findFirst({
            where: {
                id: id
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

export default AuthMiddleware
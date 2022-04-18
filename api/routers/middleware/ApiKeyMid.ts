import { Request, NextFunction, Response } from 'express'
import ApiResponse from '../../libs/ApiResponse'
import Helper from '../../utils/Helper'

const ApiKeyMid = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const headers = req.headers
        console.log(headers)
        // check for access-key in header
        if(!headers['x-access-key']) throw new Error("Missing Access Key")

        const apiKey = headers['x-access-key'].toString()
        console.log(apiKey)

        // verify api key
        const api = await Helper.verifyApiKey(apiKey)

        if(!api) throw new Error("Invalid Access key")

        // set apikey details accessible across the backend
        req.user.api = api.id && api

        next()
    }catch(e: any){
        res.status(401).json(ApiResponse<Error>(true, e.message, e))
    }

}

export default ApiKeyMid
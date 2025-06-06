import { Request, NextFunction, Response } from 'express'
import ApiResponse from '../../libs/ApiResponse'
import { LOGGER } from '../../libs/logger'
import Helper from '../../utils/Helper'

const ApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    LOGGER("BRACKR-REQ", req.originalUrl)

    try {

        const headers = req.headers
        // check for access-key in header
        if(!headers['x-access-key']) throw new Error("Missing Access Key")

        const apiKey = headers['x-access-key'].toString()

        // verify api key
        const api = await Helper.verifyApiKey(apiKey)

        if(!api) throw new Error("Invalid Access key")

        // set apikey details accessible across the backend
        // req.auth.api = api
        req.api =  api

        next()
    }catch(e: any){
        res.status(401).json(ApiResponse<Error>(true, e.message, e))
    }

}

export default ApiKeyMiddleware
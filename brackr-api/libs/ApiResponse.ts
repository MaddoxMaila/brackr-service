import { LOGGER } from "./logger"

export default function ApiResponse<T>(error: boolean, message: string, response: T) {
    
    if(error){
        LOGGER("BRACKR-API", message)
    }

    return {
        error, message, response
    }
}
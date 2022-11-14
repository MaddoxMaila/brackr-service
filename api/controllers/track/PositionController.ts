import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import ErrorResponse from "../../libs/ErrorResponse"
import { computePosition } from "./track"


const PositionController = {
    savePositionCoordinates: async (req: Request, res: Response) => {

        try{

            const {trackedObjectId, journeyId, lat, lng} = req.body
            const companyId               = req.api?.companyId

            const position = computePosition({lat, lng, companyId, trackedObjectId, journeyId})

            res.status(200).json(ApiResponse(false, "position saved", position))

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    getPositionCoordinates: async () => {
        
    },
    
}

export default PositionController
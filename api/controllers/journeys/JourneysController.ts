import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import { db } from "../../libs/Db"
import ErrorResponse from "../../libs/ErrorResponse"



const JourneysController = {
    createJourney: async (req: Request, res: Response) => {
        try{

            const {trackedObjectId, from, to} = req.body
            const TRANSIT = 1

            if(await db.journey.count({
                where: {
                    transit: TRANSIT,
                    companyId: req.api?.companyId,
                    trackedObjectId: trackedObjectId
                }
            }) != 0) throw new Error("Cannot create new journey while you have ongoing journeys")

            if(!await db.journey.create({
                data: {
                    from: from,
                    to: to,
                    transit: TRANSIT,
                    companyId: req.api?.companyId,
                    trackedObjectId: trackedObjectId
                }
            })) throw new Error("New journey not created")

            res.status(200).json(ApiResponse(false, "New journey created", {}))

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    stopJourney: async (req: Request, res: Response) => {

    },
    getAllJourneys: async (req: Request, res: Response) => {
        
    }
}

export default JourneysController
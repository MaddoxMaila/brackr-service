import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import { db } from "../../libs/Db"
import ErrorResponse from "../../libs/ErrorResponse"


const TRANSIT = 1

const JourneysController = {
    createJourney: async (req: Request, res: Response) => {
        try{

            const {trackedObjectId, from, to} = req.body

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
                    trackedObjectId: trackedObjectId,
                    userId: req.api?.id
                }
            })) throw new Error("New journey not created")

            res
                .status(200)
                .json(
                    ApiResponse(false, "New journey created", {})
                )

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    stopJourney: async (req: Request, res: Response) => {
        try {

            const { busId } = req.params

            const journey = await db.journey.findFirst({
                where: {
                    companyId: req.api?.companyId,
                    id: parseInt(busId),
                    userId: req.api?.id,
                    transit: TRANSIT
                }
            })

            if(!journey) throw new Error("No journey to stop for this bus")

            const stopJourney = await db.journey.update({
                where: {
                    id: journey.id
                },
                data: {
                    transit: 0
                }
            })

            if(!stopJourney)
                throw Error("Failed to stop journey")

            res
                .status(200)
                .json(
                    ApiResponse(false, "Journey was stopped", journey)
                )

        } catch (e: any) {
            ErrorResponse(res, e)
        }
    },
    getAllJourneys: async (req: Request, res: Response) => {

        try {

            const journeys = await db.journey.findMany({
                where: {
                    companyId: req.api?.companyId,
                }
            })

            if(!journeys) throw Error("error fetching all company journeys")

            res
                .status(200)
                .json(
                    ApiResponse(false, "all journeys found", journeys)
                )
            
        } catch (e: any) {
            ErrorResponse(res, e)
        }
        
    },
    getJourney: async (req: Request, res: Response) => {
        try {

            const journey = await db.journey.findFirst({
                where: {
                    companyId: req.api?.companyId,
                    userId: req.api?.id,
                    transit: TRANSIT
                }
            })

            if(!journey)
                throw new Error("Journey does not exist")

            res
                .status(200)
                .json(
                    ApiResponse(false, "journey found", journey)
                )

        } catch (e: any) {
            ErrorResponse(res, e)
        }
    }
}

export default JourneysController
import { Request, Response } from "express"
import { db } from "../../libs/Db"
import ErrorResponse from "../../libs/ErrorResponse"
import { Coords } from "../../libs/types"



const PositionController = {
    savePositionCoordinates: async (req: Request, res: Response) => {

        try{

            const {trackObjectId, lat, lng} = req.body
            const {companyId}               = req.params

            // const position = this.computePosition()

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    getPositionCoordinates: async () => {
        
    },
    computePosition: async (coords: Coords, companyId: number, trackedObjectId: number) => {

        const p = await db.position.create({
            data: {
                latitude: coords.lat,
                longitude: coords.lng,
                trackedObjectId: trackedObjectId,
                companyId: companyId
            }
        })
        if(!p) throw new Error("failed to save position")

        return p

    }
}

export default PositionController
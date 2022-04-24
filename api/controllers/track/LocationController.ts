import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import { db } from "../../libs/Db"
import ErrorResponse from "../../libs/ErrorResponse"



const LocationController = {
    addLocation: async (req: Request, res: Response) => {

        try{

            const {name} = req.body

            if(
                await db.location.findFirst({
                    where: {
                        companyId: req.api?.companyId,
                        name: name
                    }
                })
            ) throw new Error("Location already exists")

            db.location.create({
                data: {
                    name: name,
                    companyId: req.api?.companyId
                }
            })

            res.status(200).json(ApiResponse(false, "location added", {name: name, companyId: req.api?.companyId}))

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    getLocations: async (req: Request, res: Response) => {
        try{

            const {lastId} = req.query

            const locations = await db.location.findMany({
                where: {
                    companyId: req.api?.companyId
                }
            })

            if(!locations) throw new Error("No locations found")

            res.status(200).json(ApiResponse(false, "locations found", locations))
            
        }catch(e: any){
            ErrorResponse(res, e)
        }
    }
}

export default LocationController
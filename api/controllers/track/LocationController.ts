import { Request, Response } from "express"



const LocationController = {
    addLocation: async (req: Request, res: Response) => {

        try{

            const {name} = req.body
            const companyId = parseInt(req.params.companyId)

            

        }catch(e: any){

        }

    },
    getLocation: async (req: Request, res: Response) => {
        
    }
}

export default LocationController
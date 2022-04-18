import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import { createApiKeyExpireDate, generateAPIKey } from "../../libs/createApiKey"
import { db, Company } from '../../libs/Db'
import { CompanyCreated } from "../../libs/types"


    const CompanyController = {
        addNewCompany: async (req: Request, res: Response) => {
            try {
                
                const { name, email } = req.body

                // check for company email uniqueness
                const u = await db.company.findUnique({
                    where: {
                        email: email,
                    }
                })
                if (u) throw new Error("Already Registered with this email.")

                // generate company api-key
                const {hashedAPIKey, apiKey} = generateAPIKey(email)

                // check for hashAPIKey uniqueness
                const api = await db.apikey.findUnique({
                    where : {
                        apiKey: hashedAPIKey,
                    }
                })
                if (api) throw new Error("Api key already exists for this email")

                const company = await db.company.create({
                    data: {
                        name: name,
                        email: email,
                    }
                })

                if(!company.id) throw new Error("Cannot save company")

                // create apikey for company
                const apikey = await db.apikey.create({
                    data: {
                        apiKey: hashedAPIKey,
                        expire: createApiKeyExpireDate(365),
                        companyId: company.id
                    }
                })
                if(api) throw new Error("Apikey not created")

                res.status(200).json(
                    ApiResponse<CompanyCreated>(false, "company created successfully", {
                        name: company.name,
                        email: company.email,
                        id: company.id,
                        apikey: apiKey
                    })
                )


            } catch (e: any) {
                console.log("company creation: ", e);
                let response = ApiResponse(true, e.message, e);
                res.json(response);
            }
    
    
        },
        deleteCompany: async () => {
            
        },
    }

const VehicleController = {
    addNewVehicle: async () => {

    },
    deleteVehicle: async () => {
        
    },
}


const JourneyController = {
    addNewJourney: async () => {
        
    },
    deleteJourney: async () => {

    }
}

export {
    CompanyController,
    VehicleController,
    JourneyController
}
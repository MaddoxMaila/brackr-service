import { Request, Response } from "express"
import ApiResponse from "../../libs/ApiResponse"
import { createApiKeyExpireDate, generateAPIKey } from "../../libs/createApiKey"
import { db, Company } from '../../libs/Db'
import ErrorResponse from "../../libs/ErrorResponse"
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
                ErrorResponse(res, e)
            }
    
    
        },
        deleteCompany: async () => {
            
        },
    }

const TrackedObjectController = {
    addNewTrackedObject: async (req: Request, res: Response) => {

        try{

            const {name}    = req.body

            if(
                await db.trackedObject.findUnique({
                    where: {
                        name: name
                    }
                })
            ) throw new Error(`${name} already exists, generate another one`)

            const t = await db.trackedObject.create({
                data: {
                    name: name,
                    companyId: req.api?.companyId
                }
            })
            if(!t) throw new Error("Failed to add tracked object")

            res.status(200).json(ApiResponse(false, "Tracked Object added", t))

        }catch(e: any){
            ErrorResponse(res, e)
        }

    },
    getAllTrackedObjects: async (req: Request, res: Response) => {

    },
    deleteTrackedObject: async (req: Request, res: Response) => {
        
    },
}


export {
    CompanyController,
    TrackedObjectController,
}
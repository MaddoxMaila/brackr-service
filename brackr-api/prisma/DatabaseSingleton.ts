import { PrismaClient } from "@prisma/client"
import { LOGGER } from "../libs/logger"


class DatabaseSingleton {
    static db: PrismaClient

    constructor(){
        
        // Never call this constructor directly in code, always call the static method "getDb"
        try {
            DatabaseSingleton.db = new PrismaClient()
        } catch (e: any) {
            console.log(e)
        }
    }

    static getDb(): PrismaClient{
        
         // Main Singleton pattern logic.
        if(!DatabaseSingleton.db)
             new DatabaseSingleton()
        return DatabaseSingleton.db
    }

    static async connect(){
        try{
            await DatabaseSingleton.getDb().$connect()
        }catch(e: any){
            LOGGER("PRISMA", e)
        }
    }

}

export default DatabaseSingleton
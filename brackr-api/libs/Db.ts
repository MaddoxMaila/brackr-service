import { 
    PrismaClient,
    User,
    Apikey,
    Journey, 
    Company,
    Position,
} from "@prisma/client";
import DatabaseSingleton from "../prisma/DatabaseSingleton";

/**
 * @description
 * Create a prisma database client
 */
const db = DatabaseSingleton.getDb()

export {
    db,
    User,
    Apikey,
    Journey,
    Company,
    Position,
}
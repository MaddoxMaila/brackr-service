import { 
    PrismaClient,
    User,
    Apikey,
    Journey, 
    Company,
    Position,
} from "@prisma/client";

/**
 * @description
 * Create a prisma database client
 */
const db = new PrismaClient()

export {
    db,
    User,
    Apikey,
    Journey,
    Company,
    Position,
}
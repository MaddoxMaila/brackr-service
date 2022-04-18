import { 
    PrismaClient,
    User 
} from "@prisma/client";

/**
 * @description
 * Create a prisma database client
 */
const db = new PrismaClient()

export {
    db,
    User
}
import { createApiKeyExpireDate, generateAPIKey } from '../libs/createApiKey';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

export async function createSuperCompany(name: string, email: string) {

    // Check if company already exists
    const existingCompany = await prisma.company.findUnique({
        where: { email }
    });

    if (existingCompany) {
        throw new Error(`Company with name "${name}" already exists.`);
    }

    // Create new company
    const company = await prisma.company.create({
        data: {
            name,
            email: email
        }
    });

    if (!company) {
        throw new Error('Failed to create super company');
    }

    const {hashedAPIKey, apiKey} = generateAPIKey(email)
    // Check if API key already exists  
    const existingApiKey = await prisma.apikey.findUnique({
        where: {
            apiKey: hashedAPIKey,
        }
    });

    if (existingApiKey) {
        throw new Error('API key already exists for this email');
    }

    const apikey = await prisma.apikey.create({
                    data: {
                        apiKey: hashedAPIKey,
                        expire: createApiKeyExpireDate(365),
                        companyId: company.id
                    }
                })

    if (!apikey) {
        throw new Error('Failed to create API key for the super company'); 
    }

    return {company, apiKey};
}


export async function createSuperUser(name: string, email: string, password: string) {

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error(`User with email "${email}" already exists.`);
    }

    const company = await prisma.company.findFirst({
        where: { email: process.env.SUPER_COMPANY_EMAIL }
    });

    if (!company) {
        throw new Error('Super company does not exist. Please create a super company first.');
    }

    // Create new user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await bcryptjs.hash(password, await bcryptjs.genSalt(10)),
            type: 'super', // Assuming 'super' is the type for super users
            companyId: company.id // Assuming super users are not associated with a specific company
             // Ensure to hash the password in production
        }
    });

    if (!user) {
        throw new Error('Failed to create super user');
    }

    return user;
}
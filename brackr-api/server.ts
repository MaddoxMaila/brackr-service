import { LOGGER } from './libs/logger';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import helmet from 'helmet'

//import routes
import Routers from './routers/index';
import AuthMiddleware from './routers/middleware/AuthMiddleware'
import ErrorMiddleware from './routers/middleware/ErrorMiddleware';
import ApiKeyMiddleware from './routers/middleware/ApiKeyMiddleware';

import socketIO from './socket.io'
import DatabaseSingleton from './prisma/DatabaseSingleton';
import { StartRabbitMQConsumer } from './rabbitmq/rpc/RabbitConsumer';
import { rmqProducer } from './rabbitmq/RabbitMQProducer';
import { createSuperCompany, createSuperUser } from './utils/createSupers';


//init
dotenv.config()

const app = express()
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use(helmet());
//enable cros 
app.use(cors({ origin: true, credentials: true }))

const VER = process.env.API_VERSION || '1';
LOGGER('APP', `API Version: v${VER}`)
//routers
app.get(`v${VER}/`, (req, res) => res.send('Running.. 🚀'))

// Application middlewares
const MIDDLEWARES = [
    // Makes sure requests that come have an access key to use our  services
    AuthMiddleware,
    ApiKeyMiddleware,
]

app.use(`/v${VER}/auth`, ApiKeyMiddleware, Routers.authRouter)
app.use(`/v${VER}/admin`, MIDDLEWARES, Routers.adminRouter)
app.use(`/v${VER}/journey`, MIDDLEWARES, Routers.journeyRouter)
app.use(`/v${VER}/position`, MIDDLEWARES, Routers.positionRouter,)
app.use(`/v${VER}/location`, MIDDLEWARES, Routers.locationRouter)

// app.use('/auth', Routers.authRouter)
// app.use('/private', AuthMid, require('./routers/authRouter'))


// catch all error
app.use(ErrorMiddleware);

const port = process.env.PORT || 2828;
app.listen(port, async () => {
    
    
    await DatabaseSingleton.connect()
    
    // Initial socket IO connection
    socketIO.onConnection()
    
    rmqProducer.connect()
    
    await StartRabbitMQConsumer()

    try {
        LOGGER("[APP]", await createSuperCompany(process.env.SUPER_COMPANY_NAME || "Brackr", process.env.SUPER_COMPANY_EMAIL || ""))
        LOGGER("[APP]", await createSuperUser(process.env.SUPER_USER_NAME || "Admin", process.env.SUPER_USER_EMAIL || "maddox@gmail.com", process.env.SUPER_USER_PASSWORD || "qwerty123"))
    } catch (e: any) {
        LOGGER("[APP]", `Creating super user & company: ${e.message}`)
    }
    
    LOGGER("SERVER", `server running on port ${port}`)
})


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

//routers
app.get('/', (req, res) => res.send('Running.. 🚀'))

// Application middlewares
const MIDDLEWARES = [
    // Makes sure requests that come have an access key to use our  services
    AuthMiddleware,
    ApiKeyMiddleware,
]

app.use('/auth', ApiKeyMiddleware, Routers.authRouter)
app.use('/admin', MIDDLEWARES, Routers.adminRouter)
app.use('/journey', MIDDLEWARES, Routers.journeyRouter)
app.use('/position', MIDDLEWARES, Routers.positionRouter,)
app.use('/location', MIDDLEWARES, Routers.locationRouter)

// app.use('/auth', Routers.authRouter)
// app.use('/private', AuthMid, require('./routers/authRouter'))


// catch all error
app.use(ErrorMiddleware);

const port = process.env.PORT || 2828;
app.listen(port, async () => {
    
    LOGGER("SERVER", `server running on port ${port}`)
    
    await DatabaseSingleton.connect()
    
    // Initial socket IO connection
    socketIO.onConnection()
    
    rmqProducer.connect()

    await StartRabbitMQConsumer()

})


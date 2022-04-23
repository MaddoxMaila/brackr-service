import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import AuthMid from './routers/middleware/AuthMid'
import ErrorMid from './routers/middleware/ErrorMid';

//import routes
import Routers from './routers/index';
import ApiKeyMid from './routers/middleware/ApiKeyMid';


//init
dotenv.config()

const app = express()
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(helmet());
//enable cros 
app.use(cors({ origin: true, credentials: true }))

//routers
app.get('/', (req, res) => res.send('Running.. 🚀'))

// Application middlewares
const middleware = [

    // Makes sure requests that come have an access key to use our  services
    ApiKeyMid
]

app.use(
    '/auth',
    middleware,
    Routers.authRouter
)

app.use(
    '/admin',
    middleware,
    Routers.adminRouter
)

app.use(
    '/journey',
    middleware,
    Routers.journeyRouter
)

app.use(
    '/position',
    middleware,
    Routers.positionRouter,
)

app.use(
    'location',
    middleware,
    Routers.locationRouter
)

// app.use('/auth', Routers.authRouter)
// app.use('/private', AuthMid, require('./routers/authRouter'))


//catch all error
app.use(ErrorMid);


const port = process.env.PORT || 2828;
app.listen(port, () => console.log(`Server Running on PORT ${port}`))
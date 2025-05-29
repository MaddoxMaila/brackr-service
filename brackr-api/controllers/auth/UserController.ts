import { Request, Response } from "express";
import { db, User } from '../../libs/Db'
import ApiResponse from '../../libs/ApiResponse';
import Define from "../../utils/Define";
import Helper from "../../utils/Helper";
import bcryptjs from 'bcryptjs'


const UserController = {
    /**
     * @description
     * get email, name, password from req.body
     * do validatioin
     * ck already have an account or not(mySql Optional,Mongo required)
     * create password hash,save into database
     * generate a jwt access token,set into http cookie
     * return new user object as response
    * @param { email, name, password, type } =req.body
     * @response {error(boolean), message(String), response(object:USER)}
     */
    signUp: async (req: Request, res: Response) => {
        try {

            const ACCOUNT_TYPE = ['user', 'admin', 'superadmin', 'driver']

            console.log("req.body: ", req.body);
            const { email, name, password, type } = req.body
            const companyId = req.api?.companyId
            if(!ACCOUNT_TYPE.includes(type)) throw new Error("Creating new user failed, context?")
            //validatioin handle by sequlize
            if (password.length < 6) {
                throw new Error("Password Length Should be More than 5 character.")
            }
            //get hash pass & save new user into db
            const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10))

            //save on database
            //const user = db.user
            // const candidate=db.candidte
            // const company=db.company

            const u = await db.user.findUnique({
                where: {
                    email: email,
                }
            })
            if (u) {
                throw new Error("Already Registered with this email.")
            }
            //create the new user.
            const user = await db.user.create({
                data: {
                    name: name,
                    email,
                    password: hashpass,
                    type: type,
                    companyId: companyId
                }
            })

            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id + "")
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION)

            //, token-if you want you can pass the token
            res.status(200).json(ApiResponse(false, "user created successfully", {user, token}))

        } catch (e: any) {
            console.log("auth sign up: ", e);
            let response = ApiResponse(true, e.message, e);
            res.json(response);
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            //validatioin
            if (!email || !password) {
                throw new Error("Enter email,password")
            }
            //check user is available or not in db
            const u = await db.user.findUnique({
                where: {
                    email: email,
                }
            })
            if (!u) {
                throw new Error("No User Found with this email!")
            }
            const user = u!

            //console.log(user);
            //validate password
            const ckPass = await bcryptjs.compare(password, user.password)
            if (!ckPass) {
                throw new Error("Wrong email or password")
            }

            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id + "")
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION)
            
            let currentJourney: any = {}

            switch(user.type){

                case "driver":
                    currentJourney = await db.journey.findFirst({
                        where: {
                            userId: user.id,
                            companyId: user.companyId,
                            transit: 1
                        }
                    })
                break

            }

            //, token-if you want you can pass the token
            res.status(200).json(ApiResponse(false, "user logged in successfully", {user, token, currentJourney}))

        } catch (e: any) {
            let response = ApiResponse(true, e.message, e)
            res.json(response)
        }
    },
    logout: (req: Request, res: Response) => {
        res.cookie(Define.TOKEN, "", Define.LOGOUT_COOKIE_OPTION)
        res.status(200).json(ApiResponse(false, "user logged out", true))
    },
    isLoggedIn: (req: Request, res: Response) => {
        try {
            const token = req.cookies[Define.TOKEN]
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            Helper.verifyJWTtoken(token)
            res.send(true)// logged in
        } catch (e) {
            //remove the old/expire token
            res.cookie("token", "", Define.LOGOUT_COOKIE_OPTION)
            res.send(false)//not logged in
        }
    }
}


export default UserController
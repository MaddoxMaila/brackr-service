import { Router } from "express";
import AdminController from "../controllers/auth/AdminController";
const router = Router()

/**
 * @description 1. create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/signup
 * @example same
 */
router.post('/signup', AdminController.signUp)

/**
 * @description 2. login user
 * @param { email:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/login
 * @example same
 */
router.post('/login', AdminController.login)

/**
 * @description 3. logout user
 * @endpoint http://localhost:2727/auth/logout
 * @example same
 */
router.get('/logout', AdminController.logout)

/**
 * @description 4. ck logged in or not
 * @endpoint http://localhost:2727/auth/is-loggedin
 * @example same
 */
router.get('/is-loggedin', AdminController.isLoggedIn)

/**
 * @description 5. forget password
 * @endpoint http://localhost:2727/auth/forget-password
 * @example same
 */
router.post('/forget-password', (req, res) => {
    res.json({ ok: "OK" })
})

/**
 * @description 6. change password
 * @endpoint http://localhost:2727/auth/change-password
 * @example same
 */


export default router
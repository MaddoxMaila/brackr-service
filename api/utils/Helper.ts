import jwt, { Jwt } from 'jsonwebtoken'
import moment from 'moment'

/**
 * get a date after 1 day @return miliseconds
 * @param {number} day
 * @returns Unix timestamp in milliseconds
 */
const getExpireDay = (day: number) => {
    return moment().add(day, "days").valueOf()
}

/** 
 * expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js Eg: 60, "2 days", "10h", "7d"
  */
const getJWTtoken = (id: string, expiresIn?: string) => {
    if (expiresIn) {
        return jwt.sign({ id: id }, process.env.ACCESS_SECRET + "", { expiresIn: expiresIn });
    } else {
        return jwt.sign({ id: id }, process.env.ACCESS_SECRET + "");
    }
}

const verifyJWTtoken = (token: string): string => {
    try {
        if (!token) {
            throw new Error("Unauthorized Access")
        }
        const jwtpayload = jwt.verify(token, process.env.ACCESS_SECRET + "")

        const payload = jwtpayload as jwt.JwtPayload

        //console.log("jwt payload: ", payload['id'], "==", payload.id);

        return payload.id
    } catch (e) {
        throw new Error("Unauthorized Access")
    }
}

export default {
    getExpireDay, getJWTtoken, verifyJWTtoken
}


import React from "react"
import axios from "axios"
import {UserType} from '../types'
import AsyncStorage from "@react-native-community/async-storage"
import { AuthContextType, AuthStateType } from "./contextTypes"
import { API_URL } from "../constants"

const AuthState: AuthStateType = {
    user: undefined,
    apikey: undefined,
    authToken: "",
    loading: false,
    e: {
        message: "",
        error: false
    }
}

const getAuthState = () => {
    return AuthState
}

const authUser = async (form: {email: String, password: String}, callback: (data: any) => void) => {

    AuthState.loading = true
    console.log("Fucken workddd")
    axios.post(`${API_URL}/auth/login/`, form)
         .then(async ({data}) => {
            
            callback(data)

         })

}

const fetchUser = () => {  
}

const logoutUser = () => {
}

const AuthContext = React.createContext<AuthContextType>({
    fetchUser : fetchUser,
    authUser : authUser,
    logoutUser : logoutUser,
    getAuthState: getAuthState
})

export {AuthContext, authUser, fetchUser, logoutUser, getAuthState}
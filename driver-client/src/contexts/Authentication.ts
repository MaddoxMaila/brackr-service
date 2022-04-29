import React from "react"
import axios from "axios"
import {UserType} from '../types'
import AsyncStorage from "@react-native-community/async-storage"
import { AuthContextType, AuthStateType } from "./contextTypes"
import { API_URL } from "../constants"

let AuthState: AuthStateType = {
    user: undefined,
    apikey: undefined,
    authToken: "",
    loading: false,
    e: {
        message: "",
        error: false
    }
}

const setAuthState = (state: any) => {
    AuthState = state
    console.log(state)
    console.log(AuthState)
}

// const setUser = (user: any) => {
//     AuthState.user = user
// }

// const setAuth = (auth: any) => {
//     AuthState.apikey = auth?.api
//     AuthState.authToken = auth?.token
// }

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
    AuthState,
    fetchUser,
    authUser,
    logoutUser,
    setAuthState,
    // setUser,
    // setAuth
})

export {AuthContext, AuthState, authUser, fetchUser, logoutUser, setAuthState}
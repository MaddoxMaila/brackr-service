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

const setUser = (user: any) => {
    AuthState.user = user
}

const setAuth = (auth: any) => {
    AuthState.apikey = auth?.api
    AuthState.authToken = auth?.token
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
    AuthState,
    fetchUser,
    authUser,
    logoutUser,
    getAuthState,
    setUser,
    setAuth
})

export {AuthContext, authUser, fetchUser, logoutUser, getAuthState}
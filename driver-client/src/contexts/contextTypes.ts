import { UserType, ApiKeyType } from "../types"

export type Colors = {
    primaryColor: any
}

export type Theme = {
    colors : Colors
}

export type AuthStateType = {
    user: UserType | undefined,
    apikey: ApiKeyType | undefined,
    authToken: String,
    loading: boolean,
    e: {
        message: String,
        error: boolean
    }
}

export type AuthContextType = {
    AuthState: AuthStateType,
    fetchUser : () => UserType | any,
    authUser : (form: any, callback: any) => void,
    logoutUser : () => void,
    setAuthState: (state: any) => void,
    // setUser: (user: any) => void,
    // setAuth: (auth:any) => void,
}

export type ThemeContextType = {
    setColors: (color: Colors) => void,
    getTheme: () => Theme
}


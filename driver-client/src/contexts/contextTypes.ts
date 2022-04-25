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
    fetchUser : () => UserType | any,
    authUser : (form: any, callback: any) => void,
    logoutUser : () => void,
    getAuthState: () => AuthStateType
}

export type ThemeContextType = {
    setColors: (color: Colors) => void,
    getTheme: () => Theme
}


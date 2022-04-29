import React, {useEffect} from 'react'
import {AuthContext, fetchUser, authUser, logoutUser, AuthState, setAuthState} from '../contexts/Authentication'

interface AuthProviderProps {}

const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

        useEffect(() => {

        }, [])

        return (
            <AuthContext.Provider value={{setAuthState, fetchUser, logoutUser, authUser, AuthState}}>
                {children}
            </AuthContext.Provider>
        )
}

export default AuthProvider
import React, {useEffect} from 'react'
import {AuthContext, fetchUser, authUser, logoutUser, getAuthState} from '../contexts/Authentication'

interface AuthProviderProps {}

const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

        useEffect(() => {

        }, [])

        return (
            <AuthContext.Provider value={{getAuthState, fetchUser, logoutUser, authUser}}>
                {children}
            </AuthContext.Provider>
        )
}

export default AuthProvider
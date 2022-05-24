import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { AppTabs } from "./AppTabsStack";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../store/modules/auth.module";
import AsyncStorage from "@react-native-community/async-storage";

const isUserLoggedIn = async () => {

    let tokenFromLocalStorage = await AsyncStorage.getItem('token')
    let userFromLocalStorage = await AsyncStorage.getItem('user')

    if(tokenFromLocalStorage && userFromLocalStorage){

        userFromLocalStorage = JSON.parse(userFromLocalStorage)

        return {
            user: userFromLocalStorage,
            token: tokenFromLocalStorage
        }
    }

    return false

}

const MainNavigation : React.FC = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {

        isUserLoggedIn().then(loggedIn => {
            if(loggedIn){
                dispatch(setToken(loggedIn?.token))
                dispatch(setUser(loggedIn?.user))
            }
        })
    }, [])

    const auth = useSelector((state: any) => state.auth.auth)
    return (
        <NavigationContainer>
            {auth.user ? <AppTabs /> : <AuthStack />}
            {/* {auth.user && <AppStack />} */}
        </NavigationContainer>
    )
}

export default MainNavigation
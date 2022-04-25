import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";

const MainNavigation : React.FC = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default MainNavigation
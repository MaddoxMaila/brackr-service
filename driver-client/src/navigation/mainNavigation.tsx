import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { AppTabs } from "./AppTabsStack";

const MainNavigation : React.FC = () => {
    return (
        <NavigationContainer>
            <AppTabs />
            {/* <AuthStack /> */}
        </NavigationContainer>
    )
}

export default MainNavigation
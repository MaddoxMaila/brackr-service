import React from "react"
import { createStackNavigator} from "@react-navigation/stack"
import {CreateLocations, Home, Search} from "../screens/"

const { Navigator, Screen } = createStackNavigator()

const AppStack: React.FC = () => {
    return(
        <Navigator screenOptions={() => ({
            header: () => null
        })}>
            <Screen name="Home" component={Home}/>
            <Screen name="Search" component={Search}/>
            <Screen name="create-locations" component={CreateLocations}></Screen>
        </Navigator>
    )
}

export default AppStack
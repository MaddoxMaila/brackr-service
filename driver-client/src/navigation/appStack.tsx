import React from "react"
import { Notification } from "../screens"
import { createStackNavigator} from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

const AppStack: React.FC = () => {
    return(
        <Navigator>
            <Screen name="notifications" component={Notification}></Screen>
        </Navigator>
    )
}

export default AppStack
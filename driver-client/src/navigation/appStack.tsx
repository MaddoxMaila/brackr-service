import React from "react"
import { Notification, AppTabs } from "../screens"
import { createStackNavigator} from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

const AppStack: React.FC = () => {
    return(
        <Navigator>
            <AppTabs />
            <Screen name="notifications" component={Notification}></Screen>
        </Navigator>
    )
}

export default AppStack
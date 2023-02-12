import React from "react"
import { createStackNavigator} from "@react-navigation/stack"
import { Login, Register } from "../screens"
import { AuthParamList } from "../paramLists/AuthParamList"

const Stack = createStackNavigator<AuthParamList>()

const AuthStack : React.FC = () => {
    return(
        <Stack.Navigator screenOptions={{
            header : () => null
        }}>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Register" component={Register}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native";
import {LoginBuilder} from '../../components'
import {Container} from '../../components/base'

interface Props {
    navigation : any,
    route : any
}

const Login : React.FC<Props> = ({ navigation, route}) => {

    return(
        <Container App={
            <SafeAreaView>
                <LoginBuilder></LoginBuilder>
            </SafeAreaView>
        } />
    )
}

export default Login
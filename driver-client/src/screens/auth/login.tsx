import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {LoginBuilder} from '../../components'
import {Container} from '../../components/base'

interface Props {
    navigation : any,
    route : any
}

const Login : React.FC<Props> = ({ navigation, route}) => {

    return(
        <Container>
            <LoginBuilder></LoginBuilder>
        </Container>
    )
}

export default Login
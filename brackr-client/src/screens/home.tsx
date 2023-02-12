import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/headers/HomeHeader";
import ListLocations from "../components/homeBuilders/ListLocations";
import globalStyle from "../components/uiStyles/ui";

import { useDispatch, useSelector } from "react-redux";
import { JOURNEY_CONTEXT } from "../constants";
import ConfirmLocations from "../components/homeBuilders/ConfirmLocations";

interface HomeProps {
    navigation: any,
    children: any,
    route: any
}

const Home : React.FC<HomeProps> = (props) => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    if(journey.context === JOURNEY_CONTEXT.done){
        return(
            <View style={[globalStyle.screen]}> 
                <ConfirmLocations {...props} />
            </View>
        )
    }else{
        return(
            <View style={[globalStyle.screen]}> 
                <ListLocations {...props} />
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})


export default Home
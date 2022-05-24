import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card, Media } from "../base";

interface ConfirmLocationsProps {
    navigation?: any
}

const Header = () => {
    return(
        <Media />
    )
}

const Body = () => {
    return(
        <View></View>
    )
}


const ConfirmLocations: React.FC<ConfirmLocationsProps> = ({navigation}) => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    return (

        <View>
            <Card 
                Header={Header()}
                Body={Body()}
            />
        </View>

    )
}

export default ConfirmLocations

const styles = StyleSheet.create({

})
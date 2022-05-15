import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface ConfirmLocationsProps {}


const ConfirmLocations: React.FC<ConfirmLocationsProps> = () => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    return (

        <View>
            
        </View>

    )
}

export default ConfirmLocations

const styles = StyleSheet.create({
    popup: {
        position: 
    }
})
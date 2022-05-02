import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/headers/HomeHeader";
import ListLocations from "../components/homeBuilders/ListLocations";
import globalStyle from "../components/uiStyles/ui";

const Home : React.FC = () => {
    return(
        <View style={[globalStyle.screen]}> 
            <ListLocations />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})


export default Home
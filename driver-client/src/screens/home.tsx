import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/base/Header";

const Home : React.FC = () => {
    return(
        <View>
            <Header />
            <Text>Home Screen</Text>
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
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home : React.FC = () => {
    return(
        <View>
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
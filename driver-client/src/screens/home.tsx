import React from "react";
import { View, StyleSheet } from "react-native";
import { Container } from "../components/base";
import ListLocations from "../components/homeBuilders/ListLocations";
import globalStyle from "../components/uiStyles/ui";

const Home : React.FC = (props) => {
    return(
        <Container>
            <View style={[globalStyle.screen]}> 
                <ListLocations {...props} />
            </View>
        </Container>
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
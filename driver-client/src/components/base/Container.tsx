import React from 'react'
import { View, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface ContainerProps {
    App : any
}

const Container : React.FC<ContainerProps> = ({App}) => {
        return (
            <View style={styles.container}>{App}</View>
        )
}

export default Container

const styles = StyleSheet.create({
    container : {
        width : wp("100%"),
        height: hp("100%"),
        backgroundColor: "#fff",
    }
})
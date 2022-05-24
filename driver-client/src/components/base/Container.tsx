import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface ContainerProps {
    children : any
}

const Container : React.FC<ContainerProps> = ({children}) => {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    {children}
                </SafeAreaView>
            </View>
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
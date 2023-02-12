import React from 'react'
import { View, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface SpaceProps {
    size: string
}

const Space : React.FC<SpaceProps> = ({size}) => {
        return (
            <View style={[styles.space, {height : hp(size)}]}>

            </View>
        )
}

export default Space

const styles = StyleSheet.create({
    space : {
        width: wp("100%")
    }
})
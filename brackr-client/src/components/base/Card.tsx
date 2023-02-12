import React from 'react'
import {View, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface CardProps {
    Header : any,
    Body : any
}

const Card : React.FC<CardProps> = ({Header, Body}) => {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    {Header}
                </View>
                <View style={styles.cardBody}>
                    {Body}
                </View>
            </View>
        )
}

export default Card

const styles = StyleSheet.create({
    card : {
        position: "relative",
        display : "flex",
        flexDirection : "column",
        borderRadius : wp("0.5%"),
        padding : wp("0.5%"),
    },
    cardHeader : {
        // paddingLeft : wp("1%"),
        // paddingRight : wp("1%"),
        // paddingBottom : wp("1%"),
        // paddingTop : wp("1%"),
        paddingHorizontal : wp("2%"),
        paddingVertical : hp("1%"),
        borderBottomWidth : hp("0.1%"),
        borderColor: 'rgba(211, 211, 211, .175)'
    },
    cardBody : {
        paddingHorizontal : wp("2%"),
        paddingVertical : hp("1%"),
    }
})
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Media } from '.'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface NavbarProps {
    Body : any,
    Left? : any
}

const Navbar : React.FC<NavbarProps> = ({Body, Left}) => {
        return (
            <View style={[styles.navbar, styles.navFixedTop]}>
                <Media style={styles.media}
                Right={
                    <Text>Right</Text>
                }

                Body={Body}

                Left={Left}
                >

                </Media>
            </View>
        )
}

export default Navbar

const styles = StyleSheet.create({
    navFixedTop : {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1030,
    },
    navbar: {
        display: "flex",
        flexDirection: "row",
        padding: wp("1.5%"),
        height: hp("7%"),
        borderBottomWidth: hp("0.1%"),
        borderColor: "rgba(211, 211, 211, .200)",
        backgroundColor: "#fff"
    },
    media: {
        width: wp("95%")
    }
})
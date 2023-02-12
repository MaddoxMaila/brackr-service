import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'

export const buttonSyle = () => {
    return StyleSheet.create({
        btn : {
            color : '#fff',
            backgroundColor : '#007bff',
            alignItems: 'center',
            padding: 10,
            height: 38
        },
        btnLg : {
            padding: 10,
            borderRadius : 50,
        },
        btnBlock : {
            width : wp("88%"),
            fontSize : wp("2%"),
            borderRadius : 50,
        },
        text : {
            color : '#fff',
            fontSize : wp("4%"),
            fontWeight : 'bold',
        }
    
    })
}

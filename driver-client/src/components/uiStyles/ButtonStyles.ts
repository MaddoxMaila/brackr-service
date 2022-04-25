import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import { Theme } from '../../contexts/contextTypes'

export const buttonSyle = (theme: Theme) => {
    return StyleSheet.create({
        btn : {
            color : '#fff',
            backgroundColor : theme.colors.primaryColor, //'#007bff'
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

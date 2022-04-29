import React from 'react'
import { StyleSheet, KeyboardTypeOptions, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface InputProps{
    ontype? : (text : string | number) => void,
    text? : string,
    hint : string,
    type? : KeyboardTypeOptions,
    style? : Object | undefined,
    secure? : boolean | false
}

const Input : React.FC<InputProps> = ({ ontype, text, hint, type, style, secure}) => {
        
        return (
            <TextInput
                style={[styles.input, style]}
                onChangeText={text => ontype ? ontype(text) : {}}
                value={text}
                placeholder={hint}
                keyboardType={type}
                secureTextEntry={secure}
            />
        )

}

export default Input

const styles = StyleSheet.create({
    input : {
        display : "flex",
        width : "100%",
        height : hp("6%"),
        padding : wp("2%"),
        fontSize : 15,
        fontWeight: "400",
        borderWidth : wp("0.1%"),
        borderColor : "#ced4da",
        borderRadius : wp("1%"),
    },
    inputBlock: {

    }
})
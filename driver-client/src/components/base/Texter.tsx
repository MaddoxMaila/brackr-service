import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface TexterProps {
    text? : String,
    font? : String
}

const Texter : React.FC<TexterProps> = ({text, font}) => {

        let getFont = (f : String | undefined) => {

            switch(f){
                case 'text-grey-sm':
                    return styles.greySM
                    break
                case 'text-grey'   :
                    return styles.grey
                    break
                case 'text-grey-lg':
                    return styles.greyLG
                    break
                case 'text-post'   :
                    return {}
                    break
                case 'text-bold'   :
                    return styles.bold
                    break
                case 'text-bolder' :
                    return styles.bolder
                    break
                case 'text-max'    :
                    return styles.max
                    break
                default:
                    return styles.grey
            }

        }

        return (
            <Text style={[getFont(font), styles.text]}>
                {text}
            </Text>
        )
}

export default Texter

const styles = StyleSheet.create({
    text : {
        fontFamily: "Helvetica",
    },
    greySM : {
        color : "rgba(170, 184, 194, 1)",
        fontSize: 15
    },
    grey : {
        color : "rgba(170, 184, 194, 1)",
        fontSize: 17
    },
    greyLG : {
        color : "rgba(170, 184, 194, 1)",
        fontSize: 18.5
    },
    postText : {

    },
    bold : {
        fontSize: 17,
        fontWeight: "600"
    },
    bolder : {
        fontSize: 19,
        fontWeight: "700"
    },
    max : {
        fontSize: 23,
        fontWeight: "600"
    }

})
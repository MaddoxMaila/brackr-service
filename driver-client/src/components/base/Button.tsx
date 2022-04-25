import { Theme } from "../../contexts/contextTypes";
import React, {useContext} from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { ThemeContext } from "../../contexts/Theme";
import Center from './Center'
import { buttonSyle } from "../uiStyles/ButtonStyles";
 
interface ButtonProps {
    title : string,
    press? : () => void | undefined,
    loading : boolean,
    block : boolean
}

const AppButton : React.FC<ButtonProps> = ({title, press, loading, block}) => {
    
    const {getTheme} = useContext(ThemeContext)
    const styles = buttonSyle(getTheme())

    return (
        <Center>
            <TouchableOpacity 
            style={[styles.btn, block ? styles.btnBlock : styles.btnLg]}
            onPress={press ? () => {
                press()
            } : undefined}
            >
                {loading ? (<ActivityIndicator size="large" color="#fff" />) : 
                    <Text style={styles.text}>{title}</Text>
                }
            </TouchableOpacity>
        </Center>
    )
}

export default AppButton

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListItemProps {
    press? : () => void | undefined,
    style?: ViewStyle | undefined
}

const ListItem: React.FC<ListItemProps> = ({children, press, style}) => {
    return (
        <TouchableOpacity 
        onPress={
            press ? () => {press()} : undefined
        }
        >
            <View style={[styles.item, style && style,]}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: .5,
        borderColor: 'lightgrey'
    }
})
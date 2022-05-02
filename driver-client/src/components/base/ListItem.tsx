import React from "react";
import { View, StyleSheet } from "react-native";

interface ListItemProps {}

const ListItem: React.FC<ListItemProps> = ({children}) => {
    return (
        <View>
            {children}
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        padding: 8
    }
})
import React from "react";
import Media from "../base/Media";
import Texter from "../base/Texter";
import AppButton from "../base/Button";
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import globalStyle from "../uiStyles/ui";

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = () => {
    return (
        <View style={[styles.wrapper, globalStyle.header]}>
            <Media
                Body={ <Texter font={"text-max"} text={"Brackr"} /> } 
                // Right={ <AppButton loading={false} block={false} title="Profile" /> }
            />
            <View style={{padding: 8}}>
                <Texter font={"text-bold"} text={"Choose Starting Location"} />
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        width: "100%",
        height: 80,
        backgroundColor: "#fff",
    }
})
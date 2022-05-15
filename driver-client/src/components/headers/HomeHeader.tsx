import React from "react";
import Media from "../base/Media";
import Texter from "../base/Texter";
import AppButton from "../base/Button";
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import globalStyle from "../uiStyles/ui";
import { useDispatch, useSelector } from "react-redux";
import { JOURNEY_CONTEXT } from "../../constants";

interface HomeHeaderProps {}

const HomeHeader: React.FC<HomeHeaderProps> = () => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    return (
        <View style={[styles.wrapper, globalStyle.header]}>
            <Media
                Body={ 
                <View>
                    <Texter font={"text-max"} text={"Brackr"} />
                    <View style={{paddingBottom: 8, paddingTop: 8}}>
                        <Texter 
                            font={"text-post"}
                            text={
                               journey.context == JOURNEY_CONTEXT.done ? "Create journey" : (journey.context == JOURNEY_CONTEXT.from ? "Choose starting location" : "Choose ending location")
                            } />
                    </View>
                </View>
             } 
                Right={ 
                <View style={{padding: 8}}>
                    {/* <PopUp visible={false}/> */}
                </View>
            }
            />
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
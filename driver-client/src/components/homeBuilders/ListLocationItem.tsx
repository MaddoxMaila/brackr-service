import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { JOURNEY_CONTEXT } from "../../constants";
import { setContext, setFrom, setTo } from "../../store/modules/journey.module";
import { Media, Texter, ListItem, AppButton } from "../base";

interface ListLocationItemProps {
    location: any
}

const showChosen = (journey: any, journeyName: string) => {

    if(journey?.from?.place == journeyName) return (
        <AppButton title="Begin" block={false} loading={false} />
    )

    if(journey?.to?.place == journeyName) return (
        <AppButton title="Finish" block={false} loading={false} />
    )
}

const ListLocationItem: React.FC<ListLocationItemProps> =  ({location}) => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    return (
        <ListItem 
        press={() => {
            if(journey.context == JOURNEY_CONTEXT.from){
                dispatch(
                    setFrom({
                        place: location?.name,
                        color: ''
                    })
                )

                dispatch(
                    setContext(JOURNEY_CONTEXT.to)
                )
            }else if(journey.context == JOURNEY_CONTEXT.to && journey?.from.place != ""){
                dispatch(
                    setTo({
                        place: location?.name,
                        color: ''
                    })
                )

                dispatch(setContext(JOURNEY_CONTEXT.done))
            }
        }}
        >
            <Media 
                Body={
                    <Texter text={location?.name} font={'text-bold'}/>
                }
                Right={
                    <View style={{padding: 8}}>
                        {showChosen(journey, location?.name)}
                    </View>
                }
            />
        </ListItem>
    )
}

export default ListLocationItem
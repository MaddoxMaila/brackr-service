import axios from "axios";
import React, { useEffect } from "react";
import { FlatList, View, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../constants";
import { setLocations } from "../../store/modules/journey.module";
import { Texter } from "../base";
import ListLocationItem from "./ListLocationItem";

interface ListLocationsProps {}

const getLocations = async () => {
    const { data } = await axios
                    .get(`${API_URL}/location/all`);
    return data
}


const Item = ({item}: any) => {
    return (
        <ListLocationItem location={item}/>
    )
}

const ListLocations: React.FC<ListLocationsProps> = () => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    useEffect(() => {

        journey?.locations.length == 0 && getLocations().then(({message, error, response}) => {
            dispatch(setLocations(response))
        })

    }, [])

    return (
        <View>

            {
                journey?.locations && journey?.locations.length == 0
                ? <Texter 
                    text={"No locations found"} /> 
                : <FlatList 
                    renderItem={Item} 
                    data={journey?.locations} 
                    keyExtractor={location => location.id.toString()} 
                  />
            }

        </View>
    )
}

export default ListLocations
import axios from "axios";
import React, { useEffect } from "react";
import { FlatList, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../constants";
import { setLocations } from "../../store/modules/journey.module";
import { Media, Texter } from "../base";
import ListItem from "../base/ListItem";

interface ListLocationsProps {}

const MakeItem =  ({item}: any) => {
    return (
        <ListItem>
            <Media Body={
                <Texter text={item?.name} />
            }/>
        </ListItem>
    )
}

const getLocations = async () => {
    const { data } = await axios
                    .get(`${API_URL}/location/all`);
    return data
}

const ListLocations: React.FC<ListLocationsProps> = () => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    useEffect(() => {

        journey?.locations.length == 0 && getLocations().then(({message, error, response}) => {
            dispatch(setLocations(response))
        })

    }, [])
    console.log(journey)
    return (
        
            journey?.locations && journey?.locations.length == 0
            ? <Texter text={"No locations found"} /> 
            : <FlatList renderItem={MakeItem} data={journey?.locations} keyExtractor={location => location.id.toString()} />
    )
}

export default ListLocations
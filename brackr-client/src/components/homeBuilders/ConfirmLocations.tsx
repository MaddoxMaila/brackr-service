import axios from "axios";
import React, {useEffect} from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../constants";
import { LocationSocket } from "../../realtime/sockets/location";
import { AppButton, Card, Media, Texter } from "../base";

interface ConfirmLocationsProps {}

const registerJourney = async (journeyData: {from: string, to: string, trackedObjectId: number}) => {

    const {data} = await axios.post(`${API_URL}/journey/new`, journeyData)
    return data

}

const ConfirmLocations: React.FC<ConfirmLocationsProps> = () => {

    const journey = useSelector((state: any) => state.journey)
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    return (

        <View>

            <View>
                <Card 
                    Header={<Texter text="Confirm Journey"  font="text-max"/>} 
                    Body={
                        <View>
                            <Texter text={`${journey.from.place} -> ${journey.to.place}`} />
                            <Media Left={
                                <AppButton 
                                    title="Confirm" 
                                    loading={false} 
                                    block={false} 
                                    press={() => {
                                        let data = registerJourney({
                                            from: journey.from.place,
                                            to: journey.to.place,
                                            trackedObjectId: 1
                                        })
                                    }}/>
                            } Right={
                                <AppButton 
                                    title="Cancel" 
                                    loading={false} 
                                    block={false} 
                                    press={() => {
                                        console.log("CANCEL JOURNEY CREATION")
                                    }}/>
                            }/>
                        </View>
                    } />
            </View>
           
        </View>

    )
}

export default ConfirmLocations

const styles = StyleSheet.create({
    
})
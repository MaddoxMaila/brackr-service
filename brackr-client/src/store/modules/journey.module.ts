import { createSlice } from "@reduxjs/toolkit";
import { JOURNEY_CONTEXT } from "../../constants";

export const journeySlice = createSlice({
    name: "journey",
    initialState: {
        from    : {
            place: "",
            color: ""
        },
        to      : {
            place: "",
            color: ""
        },
        context: JOURNEY_CONTEXT.from,
        locations : [],
        journey: null
    },
    reducers: {
        setFrom: (state, actions) => {
            state.from = actions.payload
        },
        setTo: (state, actions) => {
            state.to = actions.payload
        },
        setContext: (state, actions) => {
            state.context = actions.payload
        },
        setLocations: (state, actions?) => {
            state.locations = actions.payload
            state.locations.sort((a: any, b: any) => a?.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        },
        setJourney: (state, actions) => {
            state.journey = actions.payload
        }
    }
})

export const {setFrom, setTo, setContext, setLocations, setJourney} = journeySlice.actions

export default journeySlice.reducer
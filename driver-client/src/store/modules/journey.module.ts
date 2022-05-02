import { createSlice } from "@reduxjs/toolkit";

export const journeySlice = createSlice({
    name: "journey",
    initialState: {
        from    : "",
        to      : "",
        locations : []
    },
    reducers: {
        setFrom: (state, actions) => {
            state.from = actions.payload
        },
        setTo: (state, actions) => {
            state.to = actions.payload
        },
        setLocations: (state, actions?) => {
            state.locations = actions.payload
        }
    }
})

export const {setFrom, setTo, setLocations} = journeySlice.actions

export default journeySlice.reducer
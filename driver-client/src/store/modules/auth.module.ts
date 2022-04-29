import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
        user: null,
        token: ""
    }
  },
  reducers: {
      setToken : (state, actions) => {state.auth.token = actions.payload},

  },
})

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer
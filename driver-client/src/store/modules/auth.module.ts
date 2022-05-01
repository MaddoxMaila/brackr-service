import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../constants'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
        user: null,
        token: ""
    }
  },
  reducers: {
      setToken : (state, actions) => {
        state.auth.token = actions.payload
      },
      setUser: (state, actions) => {
        state.auth.user = actions.payload
      },
      validateToken: (state?, actions?) => {
        axios
            .post(`${API_URL}/auth/is-loggedin`)
            .then(({data}) => {
              const {message, error, response} = data
              if(!error) state.auth.user = response.user
            })
      },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setUser, validateToken } = authSlice.actions

export default authSlice.reducer
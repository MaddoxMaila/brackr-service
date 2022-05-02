import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth.module'
import { journeySlice } from './journey.module'

export default configureStore({
  reducer: {
      auth: authSlice.reducer,
      journey: journeySlice.reducer
  },
})
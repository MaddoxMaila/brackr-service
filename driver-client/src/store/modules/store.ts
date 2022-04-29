import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth.module'

export default configureStore({
  reducer: {
      auth: authSlice.reducer
  },
})
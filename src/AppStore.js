import { configureStore } from '@reduxjs/toolkit'
import authSlice from './modules/auth/entry/authSlice'

export const AppStore = configureStore({
  reducer: {
    auth: authSlice
  },
})
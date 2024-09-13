import { configureStore } from '@reduxjs/toolkit'
import shareSlice from './shares/shareSlice'
import authSlice from './modules/auth/authSlice'
import bankAccountSlice from './modules/bank/bankAccountSlice'

export const AppStore = configureStore({
  reducer: {
    auth: authSlice,
    share: shareSlice,
    bankAccount: bankAccountSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
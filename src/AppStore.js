import { configureStore } from '@reduxjs/toolkit'
import shareSlice from './shares/shareSlice'
import authSlice from './modules/auth/authSlice'
import bankAccountSlice from './modules/bank/bankAccountSlice'
import referralSlice from './modules/referral/referralSlice'
import depositPackageSlice from './modules/depositPackage/depositPackageSlice'

export const AppStore = configureStore({
  reducer: {
    auth: authSlice,
    share: shareSlice,
    bankAccount: bankAccountSlice,
    referral: referralSlice,
    depositPackage: depositPackageSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
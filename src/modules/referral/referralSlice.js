import { createSlice } from "@reduxjs/toolkit";

export const referralSlice = createSlice({
    name: "referral",
    initialState: {
        referrals: [],
        referral: null
    },
    reducers: {
        index: (state, action) => {
            state.referrals = action.payload;
            return state;
        },
        show: (state, action) => {
            state.referral = {...action.payload};
            return state;
        },
    }
});

export const {
    index, show
} = referralSlice.actions;
export default referralSlice.reducer;
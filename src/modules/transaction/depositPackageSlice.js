import { createSlice } from "@reduxjs/toolkit";

export const depositPackageSlice = createSlice({
    name: "depositPackage",
    initialState: {
        depositPackages: [],
        depositPackage: null
    },
    reducers: {
        index: (state, action) => {
            state.depositPackages = action.payload;
            return state;
        },
        show: (state, action) => {
            state.depositPackage = {...action.payload};
            return state;
        },
    }
});

export const {
    index, show
} = depositPackageSlice.actions;
export default depositPackageSlice.reducer;
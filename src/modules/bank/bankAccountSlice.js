import { createSlice } from "@reduxjs/toolkit";

export const bankAccountSlice = createSlice({
    name: "bankAccount",
    initialState: {
        bankAccounts: [],
        bankAccount: null,
        activeBankAccounts: [],
    },
    reducers: {
        index: (state, action) => {
            state.bankAccounts = action.payload;
            return state;
        },

        show: (state, action) => {
            state.bankAccount = {...action.payload};
            return state;
        },

        activeIndex: (state, action) => {
            state.activeBankAccounts = action.payload;
            return state;
        }
    }
});

export const {
    index, show, activeIndex
} = bankAccountSlice.actions;
export default bankAccountSlice.reducer;
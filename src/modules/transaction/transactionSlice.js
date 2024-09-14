import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],
        transaction: null,
    },
    reducers: {
        index: (state, action) => {
            state.transactions = action.payload;
            return state;
        },

        show: (state, action) => {
            state.transaction = {...action.payload};
            return state;
        },
    }
});

export const {
    index, show
} = transactionSlice.actions;
export default transactionSlice.reducer;
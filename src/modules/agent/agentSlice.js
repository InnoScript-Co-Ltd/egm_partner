import { createSlice } from "@reduxjs/toolkit";

export const agentSlice = createSlice({
    name: "transaction",
    initialState: {
        agents: [],
        agent: null,
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
} = agentSlice.actions;
export default agentSlice.reducer;
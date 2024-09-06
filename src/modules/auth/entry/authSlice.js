import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: "",
        id: ""
    },
    reducers: {
        update: (state, payload) => {
            state.token  = payload.token;
            state.id = payload.id;
        }
    }
});

export const { update } = authSlice.actions;
export default authSlice.reducer;
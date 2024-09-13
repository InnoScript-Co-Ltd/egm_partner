import { createSlice } from "@reduxjs/toolkit";

export const shareSlice = createSlice({
    name: "share",
    initialState: {
        notification: null,
        errors: null
    },
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload === null ? null : { ...action.payload };
            return state;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
            return state;
        }
    }
});

export const {
    setNotification, setErrors
} = shareSlice.actions;
export default shareSlice.reducer;
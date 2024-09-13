import { createSlice } from '@reduxjs/toolkit';
import { setData } from '../../libs/localstorage';
import { keys } from '../../constants/config';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        id: null,
        profile: null
    },
    reducers: {
        update: (state, action) => {
            state.token  = action.payload.access_token;
            state.id = action.payload.user.id;

            setData(keys.API_TOKEN, action.payload.access_token);
            setData(keys.ID, action.payload.user.id);
            
            return state;
        },

        setProfile : (state, action) => {
            state.profile = {...action.payload};
            return state;
        }
    }
});

export const { update, setProfile } = authSlice.actions;
export default authSlice.reducer;
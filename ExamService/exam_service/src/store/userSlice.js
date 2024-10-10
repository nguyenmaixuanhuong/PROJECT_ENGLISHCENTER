import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: '',
        user: null,
    },
    reducers: {
        getInforUser: (state, action) => {
            state.role = action.payload.role;
            state.user = action.payload.user;
        },
        logoutUser: (state, action) => {
            state.user = null;
            state.role = '';
        }
    },
});

export const { getInforUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

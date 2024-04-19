import {createSlice} from '@reduxjs/toolkit';

const NotifySlice  =  createSlice({
    name: 'Notify',
    initialState:{
       idNotify: null,
    },
    reducers: {
        // Xử lý khi logout thành công
        setNotify: (state,action) => {
            state.idNotify = action.payload;
        },
        removeNotify: (state) => {
            state.idNotify = null;
        }
    },
}
)
export const { setNotify,removeNotify } = NotifySlice.actions;
export default NotifySlice.reducer;
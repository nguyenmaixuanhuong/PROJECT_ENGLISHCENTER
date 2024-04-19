import {createSlice} from '@reduxjs/toolkit';

const TabSlice  =  createSlice({
    name: 'Tab',
    initialState:{
       tabIndex: '1',
    },
    reducers: {
        // Xử lý khi logout thành công
        setTabIndex: (state,action) => {
            state.tabIndex = action.payload;
        },
        removeTabIndex: (state,action) => {
            state.tabIndex = '1';
        }
    },
}
)
export const { setTabIndex } = TabSlice.actions;
export default TabSlice.reducer;
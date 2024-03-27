import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getClassesById } from '../services/class.api';

export const getClasses = createAsyncThunk(
    'classes/getClasses',
    async(obj)=>{       
        return getClassesById(obj.id,obj.role);
    }
)
const classSlice  =  createSlice({
    name: 'classes',
    initialState:{
        class: null,
        err: null,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getClasses.pending,(state)=>{    
            state.class = null;
            state.err = null;
        })
        .addCase(getClasses.fulfilled,(state,action)=>{     
            state.class = action.payload;
            state.err = null;
        })
        .addCase(getClasses.rejected,(state,action)=>{      
            state.class = null;
            state.err = 'Đã xảy ra lỗi, vui lòng thử lại';
        });
    },

}); 
export default classSlice.reducer;
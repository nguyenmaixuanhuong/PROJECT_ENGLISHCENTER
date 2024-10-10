import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
    name: 'questionList',
    initialState: {
        list: []
    },
    reducers: {
        setQuestionList: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setQuestionList } = questionSlice.actions;
export default questionSlice.reducer;

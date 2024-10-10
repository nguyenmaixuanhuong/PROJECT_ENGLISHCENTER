import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    examSummary: {},
    finalScore: '',
    guestId: '',
    isPublicScore: false,
    parts: []
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setResultExam: (state, action) => {
            const { examSummary, finalScore, guestId, isPublicScore, parts } = action.payload;
            state.examSummary = examSummary
            state.finalScore = finalScore
            state.guestId = guestId
            state.isPublicScore = isPublicScore
            state.parts = parts
        },
    },
});

// Export actions và reducer
export const { setResultExam } = resultSlice.actions;
export default resultSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    updatedAnswers: [], // Mảng lưu trữ answerId và finalScore
};

const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        updateScoreAnswer: (state, action) => {
            const { answerId, finalScore } = action.payload;

            // Kiểm tra nếu answerId đã tồn tại trong mảng, thì cập nhật finalScore
            const existingAnswer = state.updatedAnswers.find(answer => answer.answerId === answerId);

            if (existingAnswer) {
                existingAnswer.finalScore = finalScore;
            } else {
                // Nếu answerId chưa tồn tại, thêm mới vào mảng
                state.updatedAnswers.push({ answerId, finalScore });
            }
        },
    },
});

// Export actions và reducer
export const { updateScoreAnswer } = answersSlice.actions;
export default answersSlice.reducer;

import { updatedSTTQuestions } from '@/context/updateQuestions';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        id: '',
        status: '',
        summary: {
            title: null,
            description: null,
            scope: {
                isPulic: true,
                classes: []
            },
            times: null,
            startTime: null,
            endTime: null,
        },
        part: [{
            title: `Phần 1`,
            number: 1,
            type: "",
            questions: [],
            audioFile: null,
            score: 0,
            passage: ''
        },],
    },
    reducers: {
        setQuestions: (state, action) => {
            state.part = action.payload;
        },
        setTypeofPart: (state, action) => {
            state.part[action.payload.number - 1].type = action.payload.type;
        },
        setTitlePart: (state, action) => {
            state.part[action.payload.number - 1].title = action.payload.title;
        },
        setSummary: (state, action) => {
            state.summary = action.payload;
        },
        exitCreateExam: (state, action) => {
            state.part = []
            state.summary = {}
            state.status = ''
            state.id = ''

        },
        setExam: (state, action) => {
            state.id = action.payload?._id
            state.status = action.payload.status;
            state.summary = action.payload.summary;
            state.part = action.payload.part;
        },
        setStatus: (state, action) => {
            state.status = action.payload.status;
        },
        updatePartScore: (state, action) => {
            const { numberPart, newScore } = action.payload;
            const part = state.part.find(p => p.number == numberPart);

            if (part) {
                part.score = newScore;
                const questionCount = part.questions.length;
                const scorePerQuestion = newScore / questionCount;

                // Chia đều điểm cho mỗi câu hỏi
                part.questions.forEach(question => {
                    question.score = scorePerQuestion;

                });
            }
        },
        addNewQuestion: (state, action) => {
            const { numberPart, newQuestion } = action.payload;
            const part = state.part.find(p => p.number == numberPart);

            if (part) {
                // Thêm câu hỏi mới
                part.questions.push(newQuestion);

                // Tính tổng điểm của các câu hỏi đã cập nhật
                const totalUpdatedScore = part.questions
                    .filter(q => q.isUpdatedScore)
                    .reduce((sum, q) => sum + q.score, 0);

                // Tính điểm còn lại để chia đều cho các câu hỏi chưa được cập nhật
                const remainingScore = part.score - totalUpdatedScore;
                const remainingQuestions = part.questions.filter(q => !q.isUpdatedScore);
                const remainingQuestionCount = remainingQuestions.length;

                if (remainingQuestionCount > 0) {
                    const scorePerRemainingQuestion = remainingScore / remainingQuestionCount;

                    // Cập nhật điểm cho các câu hỏi chưa được cập nhật
                    remainingQuestions.forEach(q => {
                        q.score = scorePerRemainingQuestion;
                    });
                }
            }
        },
        deleteQuestion: (state, action) => {
            const { numberPart, questionNumber } = action.payload;
            const part = state.part.find(p => p.number === numberPart);

            if (part) {
                // Lọc bỏ câu hỏi cần xóa
                part.questions = part.questions.filter(q => q.number !== questionNumber);

                // Cập nhật lại điểm cho các câu hỏi chưa được cập nhật
                const questionCount = part.questions.length;
                if (questionCount > 0) {
                    // Tính tổng điểm của các câu hỏi đã cập nhật
                    const totalUpdatedScore = part.questions
                        .filter(q => q.isUpdatedScore)
                        .reduce((sum, q) => sum + q.score, 0);

                    // Tính điểm còn lại để chia đều cho các câu hỏi chưa được cập nhật
                    const remainingScore = part.score - totalUpdatedScore;
                    const remainingQuestions = part.questions.filter(q => !q.isUpdatedScore);
                    const remainingQuestionCount = remainingQuestions.length;

                    if (remainingQuestionCount > 0) {
                        const scorePerRemainingQuestion = remainingScore / remainingQuestionCount;

                        // Cập nhật điểm cho các câu hỏi chưa được cập nhật
                        remainingQuestions.forEach(q => {
                            q.score = scorePerRemainingQuestion;
                        });
                    }

                    // Cập nhật lại state.part nếu cần thiết
                    state.part = updatedSTTQuestions(state.part);
                }
            }
        }
        ,
        updateQuestionScore: (state, action) => {
            const { numberPart, questionNumber, newScore } = action.payload;
            const part = state.part.find(p => p.number === numberPart);

            if (part) {
                // Tìm câu hỏi cần cập nhật
                const question = part.questions.find(q => q.number === questionNumber);

                if (question) {
                    // Tính tổng điểm của tất cả các câu hỏi trước khi cập nhật
                    const totalCurrentScore = part.questions
                        .filter(q => q.number !== questionNumber)
                        .reduce((sum, q) => sum + q.score, 0);

                    // Tính tổng điểm sau khi cập nhật câu hỏi này
                    const newTotalScore = totalCurrentScore - question.score + newScore;


                    // Kiểm tra nếu tổng điểm mới vượt quá `part.score`
                    if (newTotalScore > part.score) {
                        toast.error("Tổng điểm của tất cả câu hỏi không được vượt quá tổng điểm của part.");
                        return;
                    }

                    // Cập nhật điểm của câu hỏi hiện tại
                    question.score = newScore;
                    question.isUpdatedScore = true; // Đánh dấu câu hỏi này đã được cập nhật

                    // Tính tổng điểm còn lại cho các câu hỏi chưa được cập nhật
                    const totalUpdatedScore = part.questions
                        .filter(q => q.isUpdatedScore && q.number !== questionNumber)
                        .reduce((sum, q) => sum + q.score, 0);

                    const remainingScore = part.score - totalUpdatedScore - newScore;

                    // Tìm các câu hỏi chưa được cập nhật
                    const remainingQuestions = part.questions.filter(q => !q.isUpdatedScore);
                    const remainingQuestionCount = remainingQuestions.length;

                    if (remainingQuestionCount > 0) {
                        const scorePerRemainingQuestion = remainingScore / remainingQuestionCount;

                        // Cập nhật điểm cho các câu hỏi chưa được cập nhật
                        remainingQuestions.forEach(q => {
                            q.score = scorePerRemainingQuestion;
                        });
                    }
                }
            }
        }


    },
});

export const {
    setQuestions,
    setSummary,
    exitCreateExam,
    setTypeofPart,
    setTitlePart,
    setExam,
    updatePartScore,
    addNewQuestion,
    deleteQuestion,
    updateQuestionScore } = examSlice.actions;
export default examSlice.reducer;

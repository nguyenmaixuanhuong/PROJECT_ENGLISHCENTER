import axios from "axios";

export const submitAnswer = async (answerSubmit) => {
    const { userId, answers, examId } = answerSubmit;
    try {
        const res = await axios.post('http://localhost:8080/answer/submit', { userId: userId, answers: answers, examId });
        const result = res.status;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
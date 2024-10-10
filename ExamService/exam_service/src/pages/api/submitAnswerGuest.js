import axios from "axios";

export const submitAnswerGuest = async (answerSubmit) => {
    const { guestId, answers, examId } = answerSubmit;
    try {
        const res = await axios.post('http://localhost:8080/answer/submitResultGuest', { guestId: guestId, answers: answers, examId });
        const result = await res.data;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
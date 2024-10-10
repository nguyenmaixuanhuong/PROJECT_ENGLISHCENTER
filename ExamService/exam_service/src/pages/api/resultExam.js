import axios from "axios";

export const resultExam = async (studentId, examId) => {
    try {
        const res = await axios.get('http://localhost:8080/answer/resultExam', { params: { studentId, examId } });
        const result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
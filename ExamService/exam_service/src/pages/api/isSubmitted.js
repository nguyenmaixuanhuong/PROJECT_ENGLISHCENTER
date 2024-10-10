import axios from "axios";

export const isSubmitted = async (studentId, examId) => {
    try {

        const res = await axios.get('http://localhost:8080/answer/isSubmitted', { params: { studentId, examId } });
        const result = res.data;
        return result.isSubmitted;
    } catch (error) {
        console.log(error);
        return null;
    }

}
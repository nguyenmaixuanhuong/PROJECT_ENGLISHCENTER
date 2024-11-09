import axios from "axios";

export const resultExam = async (studentId, examId) => {
    try {
        const res = await axios.get('http://localhost:8080/answer/resultExam', { params: { studentId, examId } });
        return {
            status: 200,
            result: res.data
        }

    } catch (error) {
        if (error.response.status === 400) {
            console.log(error.response.data);

            return {
                status: 400,
                result: error.response.data
            }
        }
        return null;
    }

}
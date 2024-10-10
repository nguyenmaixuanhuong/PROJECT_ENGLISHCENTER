import axios from "axios";

export const getResults = async (examId) => {
    try {
        const res = await axios.get('http://localhost:8080/answer/allSubmission', { params: { examId } });
        const result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
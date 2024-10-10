import axios from "axios";

export const TurnOnPublishScore = async (examId) => {
    try {
        const res = await axios.put('http://localhost:8080/exam/isPublishScore', { examId });
        const result = res.data;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
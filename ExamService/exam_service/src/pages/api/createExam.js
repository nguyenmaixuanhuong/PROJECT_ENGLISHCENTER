import axios from "axios";

export const createExam = async (exam, id) => {
    try {
        const res = await axios.post('http://localhost:8080/exam/create', { id: id, exam: exam });
        const result = res.status;
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
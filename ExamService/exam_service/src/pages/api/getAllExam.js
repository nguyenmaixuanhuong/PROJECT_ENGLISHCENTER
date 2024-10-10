import axios from "axios";
export default async function getAllExams(userId) {
    try {
        // const { userId } = req.query;
        const respone = await axios.get('http://localhost:8080/exam/getAll', { params: { userId } });
        const exams = await respone.data;
        return exams
    } catch (error) {
        console.log(error);
        return null;
    }
}
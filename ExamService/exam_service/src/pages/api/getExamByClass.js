import axios from "axios";
export default async function getExamsByClass(userId) {
    try {
        const respone = await axios.get('http://localhost:8080/exam/getExamsByClass', { params: { studentId: userId } });
        const exams = await respone.data;
        return exams
    } catch (error) {
        console.log(error);
        return null;
    }
}
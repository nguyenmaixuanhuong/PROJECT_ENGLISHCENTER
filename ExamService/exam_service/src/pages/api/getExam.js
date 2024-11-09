import axios from "axios";
export default async function getExam(req, res) {
    try {
        const { examId } = req.query;
        const respone = await axios.get('http://localhost:8080/exam/getExamById', { params: { examId } });
        const exam = await respone.data;
        res.status(200).json(exam);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
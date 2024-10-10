import axios from "axios";
export default async function deleteExam(req, res) {
    try {
        const { examId } = req.body;
        const respone = await axios.delete('http://localhost:8080/exam/delete', { params: { examId: examId } });
        const status = respone.status;
        if (status === 200) {
            res.status(200).json({ "message": 'Delete successfully' });
        }
        else {
            res.status(500).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
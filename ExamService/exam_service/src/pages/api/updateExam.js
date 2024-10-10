import axios from "axios";
export default async function updateExam(req, res) {
    try {
        const { exam } = req.body;
        const respone = await axios.put('http://localhost:8080/exam/update', { exam: exam });
        const status = respone.status;
        if (status === 200) {
            res.status(200).json({ "message": 'Update successfully' });
        }
        else {
            res.status(500).send(error)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
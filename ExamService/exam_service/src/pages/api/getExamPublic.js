import axios from "axios";
export default async function getExamsPublic(req, res) {
    try {
        const respone = await axios.get('http://localhost:8080/exam/getExamsPublic');
        const exams = await respone.data;
        res.status(200).json(exams);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
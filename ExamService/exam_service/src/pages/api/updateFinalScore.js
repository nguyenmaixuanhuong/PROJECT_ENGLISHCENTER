import axios from "axios";
export default async function updateFinalScore(req, res) {
    try {
        const { answersUpdate } = req.body;
        const respone = await axios.put('http://localhost:8080/answer/updateScore', { answersUpdate });
        const status = respone.status;
        if (status === 200) {
            res.status(200).json({ "message": 'Update successfully' });
        }
        else {
            console.log(res);
            res.status(500)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
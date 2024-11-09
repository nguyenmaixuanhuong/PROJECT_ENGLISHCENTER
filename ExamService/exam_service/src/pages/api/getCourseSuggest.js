import axios from "axios";
export default async function getCourseSuggest(score_skills) {
    try {
        const respone = await axios.post('http://localhost:8080/answer/suggest', { params: { score_skills } });
        const data = await respone.data;
        return data
    } catch (error) {
        console.log(error);
        return null;
    }
}
import axios from "axios";

export const getClasses = async (id, role) => {
    try {
        const res = await axios.get('http://localhost:8080/admin/class/getClassesById', { params: { id: id, role: role } });
        const classes = res.data;

        return classes;
    } catch (error) {
        console.log(error);
        return null;
    }

}
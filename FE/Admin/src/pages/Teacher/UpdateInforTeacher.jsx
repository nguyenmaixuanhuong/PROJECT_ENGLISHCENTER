import { useState ,useEffect} from "react";
import FormInforTeacher from "../../components/teacher/formInforTeacher/formInforTeacher.jsx";
import { useParams } from 'react-router-dom';
import { getTeacher } from "../../services/teacher.api.js";
import useAuthCheck from '../../context/useAuthCheck';
function UpdateInforTeacher() {
    useAuthCheck();
    const [inforTeacher, setInForTeacher] = useState(null);
    const { id } = useParams();
    useEffect(()=>{
        async function fetchData(){
            const data = await getTeacher(id);
            setInForTeacher(data)
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <FormInforTeacher infor={inforTeacher}></FormInforTeacher>
        </div>
    );
}

export default UpdateInforTeacher;
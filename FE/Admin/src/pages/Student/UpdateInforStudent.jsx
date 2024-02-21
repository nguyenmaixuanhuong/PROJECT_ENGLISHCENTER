import { useState ,useEffect} from "react";
import FormInforStudent from "../../components/student/formInfor/formInforStudent";
import { useParams } from 'react-router-dom';
import {getStudent} from '../../services/student.api.js'
import useAuthCheck from '../../context/useAuthCheck';
function UpdateInforStudent() {
    useAuthCheck();
    const [inforstudent, setInForStudent] = useState(null);
    const { id } = useParams();
    useEffect(()=>{
        async function fetchData(){
            const data = await getStudent(id);
            setInForStudent(data)
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <FormInforStudent infor={inforstudent}></FormInforStudent>
        </div>
    );
}

export default UpdateInforStudent;
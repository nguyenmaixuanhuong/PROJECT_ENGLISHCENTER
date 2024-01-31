import { useState ,useEffect} from "react";
import FormInforStudent from "../../components/student/formInforStudent";
import { useParams } from 'react-router-dom';
import {getStudent} from '../../services/student.api.js'
function UpdateInforStudent() {
    const [inforstudent, setInForStudent] = useState(null);
    const { id } = useParams();
    useEffect(()=>{
        async function fetchData(){
            const data = await getStudent(id);
            setInForStudent(data)
        }
        fetchData();
    }, [id]);

    console.log(inforstudent);
    return (
        <div>
            <FormInforStudent infor={inforstudent}></FormInforStudent>
        </div>
    );
}

export default UpdateInforStudent;
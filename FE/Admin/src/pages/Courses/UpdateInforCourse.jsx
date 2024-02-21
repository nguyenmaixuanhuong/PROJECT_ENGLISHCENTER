import { useEffect, useState } from "react";
import FormInforCourse from "../../components/course/FormInforCourse/FormInForCourse";
import { getCourse } from "../../services/course.api";
import { useParams } from 'react-router-dom';
import useAuthCheck from '../../context/useAuthCheck';
function UpdateInforCourse() {
    useAuthCheck();
    const [InforCourse, setInforCourse] = useState();
    const {id} = useParams();
    useEffect(()=>{
        async function fetchData(){
            const course = await getCourse(id);
            setInforCourse(course);
        }
        fetchData();
    },[id]);
    return ( 
        <div>
            <FormInforCourse infor={InforCourse}>

            </FormInforCourse>
        </div>
     );
}

export default UpdateInforCourse;
import FormInforCourse from "../../components/course/FormInforCourse/FormInForCourse";
import useAuthCheck from '../../context/useAuthCheck';
function AddCourse() {
    useAuthCheck();
    return ( 
        <div>
            <FormInforCourse></FormInforCourse>
        </div>
     );
}

export default AddCourse;
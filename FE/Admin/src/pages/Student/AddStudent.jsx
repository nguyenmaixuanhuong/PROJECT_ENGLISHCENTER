import FormInforStudent from "../../components/student/formInfor/formInforStudent";
import useAuthCheck from '../../context/useAuthCheck';
function AddStudent() {
    useAuthCheck();
    return ( 
        <div>
            <FormInforStudent></FormInforStudent>
        </div>
     );
}

export default AddStudent;
import FormInforTeacher from '../../components/teacher/formInforTeacher'
import useAuthCheck from '../../context/useAuthCheck';
function AddTeacher() {
    useAuthCheck();
    return ( 
        <div>
            <FormInforTeacher></FormInforTeacher>
        </div>
     );
}

export default AddTeacher;
import FormInforStudent from "../../components/student/formInfor/formInforStudent";
import useAuthCheck from '../../context/useAuthCheck';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function AddStudent() {
    useAuthCheck();
    return ( 
        <div>
             <div className="btn_return">
            <Link to='/student'>
                <IconButton sx={{color: 'red'}}>
                   <Typography variant="body1">Trở Về</Typography>
                    <ArrowRightIcon></ArrowRightIcon>
                </IconButton>
            </Link>
            </div>
            <FormInforStudent></FormInforStudent>
        </div>
     );
}

export default AddStudent;
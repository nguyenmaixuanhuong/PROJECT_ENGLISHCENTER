import FormInforCourse from "../../components/course/FormInforCourse/FormInForCourse";
import useAuthCheck from '../../context/useAuthCheck';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function AddCourse() {
    useAuthCheck();
    return ( 
        <div>
            <div className="btn_return">
            <Link to='/course'>
                <IconButton sx={{color: 'red'}}>
                   <Typography variant="body1">Trở Về</Typography>
                    <ArrowRightIcon></ArrowRightIcon>
                </IconButton>
            </Link>
            </div>
            <FormInforCourse></FormInforCourse>
        </div>
     );
}

export default AddCourse;
import { useState ,useEffect} from "react";
import FormInforStudent from "../../components/student/formInfor/formInforStudent";
import { useParams } from 'react-router-dom';
import {getStudent} from '../../services/student.api.js'
import useAuthCheck from '../../context/useAuthCheck';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
              <div className="btn_return">
            <Link to='/student'>
                <IconButton sx={{color: 'red'}}>
                   <Typography variant="body1">Trở Về</Typography>
                    <ArrowRightIcon></ArrowRightIcon>
                </IconButton>
            </Link>
            </div>
            <FormInforStudent infor={inforstudent}></FormInforStudent>
        </div>
    );
}

export default UpdateInforStudent;
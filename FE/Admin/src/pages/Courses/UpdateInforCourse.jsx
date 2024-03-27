import { useEffect, useState } from "react";
import FormInforCourse from "../../components/course/FormInforCourse/FormInForCourse";
import { getCourse } from "../../services/course.api";
import { Link, useParams } from 'react-router-dom';
import useAuthCheck from '../../context/useAuthCheck';
import { IconButton, Typography } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function UpdateInforCourse() {
    useAuthCheck();
    const [InforCourse, setInforCourse] = useState();
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            const course = await getCourse(id);
            setInforCourse(course);
        }
        fetchData();
    }, [id]);
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
            <FormInforCourse infor={InforCourse}>
            </FormInforCourse>
        </div>
    );
}

export default UpdateInforCourse;
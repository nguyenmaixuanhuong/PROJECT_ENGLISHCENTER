import "./Teacher.styles.scss"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Link } from 'react-router-dom';
import { getListTeacher } from "../../services/schedule.api";
import { useEffect, useState } from "react";
import CardTeacher from "./CardTeacher";
function TeacherPage() {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        async function fetchData() {
            const teachers = await getListTeacher();
            setTeachers(teachers);
        }
        fetchData();
    }, []);


    return (
        <div className="teacher-container">
            <div className="teacher-header">
                <h3 className='teacher-title'>Đội ngũ giáo viên tại trung tâm</h3>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to='/' style={{ textDecoration: 'none', color: 'black' }} >
                            <HomeIcon sx={{ mr: 0.5, mb: 1 }} fontSize="medium" />
                            Trang Chủ
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Đội ngũ giáo viên
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
                <div className="teacher-content container">
                    {teachers && teachers.map((teacher) => (
                        <Link style={{ textDecoration: 'none' }} to=''>
                            <div className='cart-item' key={teacher._id}>
                                <CardTeacher teacher={teacher} ></CardTeacher>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
}

export default TeacherPage;
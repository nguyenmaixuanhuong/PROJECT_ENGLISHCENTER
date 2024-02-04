import Container from '@mui/material/Container';
import './Teacher.style.scss'
import { useApp } from '../../context/AppProvider.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthCheck from '../../context/useAuthCheck';
import { Button } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import TeachersList from '../../components/teacher/teacherslist.jsx'
function Student() {
    useAuthCheck();
    const { teachers, loadTeachers } = useApp();
    useEffect(() => {
        loadTeachers();
    }, []);
    return (
        <Container>
            <div className="teacher-header">
                <h3 className='teacher-title'>Danh Sách Giáo Viên</h3>
                    <Link to="/addteacher">
                        <Button   variant="contained" color="success">
                            <ControlPointRoundedIcon/>
                            Thêm Giáo Viên Mới
                        </Button>
                    </Link>
            </div>
            <div className="teacher-body">
                <TeachersList teachers={teachers} ></TeachersList>
            </div>
        </Container>
    );
}

export default Student;
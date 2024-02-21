import Container from '@mui/material/Container';
import ListStudent from '../../components/student/listStudent/listStudent.jsx'
import './Student.style.scss'
import { useApp } from '../../context/AppProvider.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthCheck from '../../context/useAuthCheck';
import { Button } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
function Student() {
    useAuthCheck();
    const { students, loadStudents } = useApp();
    useEffect(() => {
        // Load dữ liệu học viên khi component được mount
        loadStudents();
    }, []);
    return (
        <Container>
            <div className="student-header">
                <h3 className='student-title'>Danh Sách Học Viên</h3>
                    <Link to="/addstudent">
                        <Button   variant="contained" color="success">
                            <ControlPointRoundedIcon/>
                            Thêm Học Viên Mới
                        </Button>
                    </Link>
            </div>
            <div className="student-body">
                <ListStudent students={students} ></ListStudent>
            </div>
        </Container>
    );
}

export default Student;
import Container from '@mui/material/Container';
import ListStudent from '../../components/student/listStudent.jsx'
import './Student.style.scss'
import { useApp } from '../../context/AppProvider.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function Student() {
    const { students, loadStudents } = useApp();
    useEffect(() => {
        // Load dữ liệu học viên khi component được mount
        loadStudents();
      }, [loadStudents]);
    return (
        <Container>
            <div className="student-header">
                <h3 className='student-title'>Danh Sách Học Viên</h3>
                <button>
                    <Link to="/addstudent">
                        Thêm Học Viên Mới
                    </Link>
                </button>

            </div>
            <div className="student-body">
                <ListStudent students={students} ></ListStudent>
            </div>
        </Container>
    );
}

export default Student;
import Container from '@mui/material/Container';
import CourseCart from '../../components/course/CourseCart/courseCart'
import './Course.style.scss'
import { useApp } from '../../context/AppProvider';
import useAuthCheck from '../../context/useAuthCheck';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { useEffect } from 'react';
function Course() {
    useAuthCheck();
    const { courses, loadCourses } = useApp();
    useEffect(() => {
        loadCourses();
    }, []);
    return (
        <div className='listcart'>
            <Link to="/addcourse">
                <Tooltip title="Thêm khóa học">
                    <Fab color="primary" aria-label="add" className='addcourse'>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Link>
            <Container>
                <div className="course-header">
                    <h3 className='course-title'>Danh Sách Khóa Học</h3>

                </div>
                <div className='d-flex flex-wrap justify-content-center'>
                    {courses && courses.map(course => (
                        <div className='cart-item' key={course._id}>
                            <CourseCart course={course} ></CourseCart>
                        </div>))
                    }

                </div>
            </Container>

        </div>
    )
}

export default Course;
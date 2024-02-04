import Container from '@mui/material/Container';
import CourseCart from '../../components/course/courseCart'
import './style.scss'
import { useApp } from '../../context/AppProvider';
import useAuthCheck from '../../context/useAuthCheck';
function Course() {
    useAuthCheck();
   const {courses} = useApp();
    return (
        <div className='mt-3'>
            <Container className='bg-light'>
                <h5>Danh sách khóa học</h5>
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
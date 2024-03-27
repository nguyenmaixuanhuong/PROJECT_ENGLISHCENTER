import CourseCart from '../../components/course/CourseCart/CourseCart';
import './Course.style.scss'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseWithCategory } from '../../services/course.api';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
function Course() {
    const { category } = useParams();
    const [courses, setCourse] = useState([])
    useEffect(() => {
        async function fetchCourse() {
            const courses = await getCourseWithCategory(category);
            setCourse(courses);
        }
        fetchCourse();
    }, [category]);
    return (
        <div className='listcart'>
            <div className="course-header">
                <h3 className='course-title'>Khóa học dành cho {category}</h3>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to='/' style={{textDecoration: 'none', color:'black'}} >
                            <HomeIcon sx={{ mr: 0.5,mb:1 }} fontSize="medium" />
                            Trang Chủ
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Khóa học dành cho {category}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="container">
                <div className='d-flex flex-wrap listcourse'>
                    {courses && courses.map(course => (
                        <Link  style={{textDecoration:'none'}} to={`/coursedetail/${course._id}`}>
                         <div className='cart-item' key={course._id}>
                            <CourseCart course={course} ></CourseCart>
                        </div>
                        </Link>              
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Course;
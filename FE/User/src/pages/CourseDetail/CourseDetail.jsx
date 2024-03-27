import { useEffect, useState } from 'react';
import './courseDetail.style.scss'
import { useParams, Link } from 'react-router-dom';
import { getCourse } from '../../services/course.api';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import FormRegister from '../../components/FormRegister/FormRegister';
function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        async function fetchCourse() {
            const course = await getCourse(id);
            if (course) {
                setCourse(course);
            }
        }
        fetchCourse();
    }, [id])
    console.log(course);
    return (
        <div className='coursedetail'>
            <div className="course-detail_header">
                <h3 className='course-title'>KHÓA {course?.courseName}</h3>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to='/' style={{ textDecoration: 'none', color: 'black' }} >
                            <HomeIcon sx={{ mr: 0.5, mb: 1 }} fontSize="medium" />
                            Trang Chủ
                        </Link>
                        <Link to={`/course/${course?.category}`} style={{ textDecoration: 'none', color: 'black' }} >
                            Khóa học dành cho {course?.category}
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {course?.courseName}
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="container">
                <div className="course-detail_description row">
                    <div className="col-md-8 col-sm-12">
                        <h3 className='detail-title'>Mô Tả Khóa Học</h3>
                        <p className="detail-description">
                            {course?.description}
                        </p>
                        <div className='text-center'>
                            <FormRegister course={course}></FormRegister>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 detail-image">
                        <img src={course?.image} alt="" />
                        <div className="pt-3 text-center ">
                            <h5>Tổng số buổi học: {course?.numberSession} </h5>
                            <h5>Bao gồm: 3 buổi / tuần</h5>
                            <h2 className='text-danger '>Học phí: {
                                new Intl.NumberFormat()
                                    .format(course?.fee)
                                    .replaceAll(",", ".")
                            }</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
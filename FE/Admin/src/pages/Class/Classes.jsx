import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import useAuthCheck from '../../context/useAuthCheck';
import { useApp } from "../../context/AppProvider";
import ClassCart from "../../components/Class/ListClass/ClassCard";
import './Classes.styles.scss'
import InforClass from '../../components/Class/ModalInforClass/InforClass';
import { getCourse } from "../../services/course.api";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function Classes() {
    useAuthCheck();
    const [course, setCourse] = useState();
    const { id } = useParams();
    const { classes, loadClassesByCourse, loadAllClasses } = useApp();
    useLayoutEffect(() => {
        loadClasses()
    }, [id])
    async function loadClasses() {
        if (id !== 'all') {
            await loadClassesByCourse(id);
            fectData();
        }
        else {
            await loadAllClasses();
        }
    }
    async function fectData() {
        const coursecurrent = await getCourse(id);
        setCourse(coursecurrent);
    }
    return (
        <div className="classess">
            <div className="addclass">
                <InforClass ></InforClass>
            </div>
            <div className="classes-header">
                <h3 className='classes-title'>Danh Sách Lớp Học</h3>
            </div>

            {course ?
                <div className="name_course ">
                    <ArrowRightIcon></ArrowRightIcon>
                    <h5 >Khóa {course && course.courseName}</h5>
                </div>
                : <div className="name_course" >
                    <ArrowRightIcon></ArrowRightIcon>
                    <h5>Tất cả lớp học</h5>
                </div>
            }
            <div className='d-flex flex-wrap justify-content-center '>
                {classes && classes.map(item => (
                    <div className='class-item' key={item._id}>
                        <ClassCart loadClasses={loadClasses} class={item} ></ClassCart>
                    </div>))
                }
            </div>
        </div>
    );
}

export default Classes;
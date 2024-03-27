import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllCourse } from "../../../services/course.api";
function SelectedCourse({ handleChangeCourse }) {
    const [courses, setCourse] = useState([])
    const [selected, setSelected] = useState('')
    useEffect(() => {
        async function fetchCourse() {
            const courses = await getAllCourse();
            const customCourses = courses.map(course => {
                return {
                    value: course._id,
                    label: `${course.courseName} (${course.category})`
                }
            })
            setCourse(customCourses);
        }
        fetchCourse();
    }, []);

    const handleChange = (e) => {
        const course = e.value
        setSelected(course);
        handleChangeCourse(course)
    };
    const customStyles = {
        input: (provided) => ({
            ...provided,
            borderRadius: '4px',
            padding: '10px',
            width: '100%',
            outline: 'none',
            maxWidth: '100%'
        }),
    };
    return (
            <Select
                placeholder='Tìm khóa học'
                options={courses}
                styles={customStyles}
                onChange={handleChange}
            />

    );
}

export default SelectedCourse;
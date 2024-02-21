import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useApp } from '../../../context/AppProvider';
export default function Levels({courseSelected,onChangeCourse}) {
    const [course, setCourse] = React.useState(courseSelected);
    const { courses } = useApp()
    const handleChange = (event) => {
        const selectedcourse = event.target.value;
        setCourse(selectedcourse); // Cập nhật giá trị course
        onChangeCourse(selectedcourse); // Gọi hàm callback để truyền giá trị level lên component cha
    };
    return (
        <div>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-autowidth-label">Khóa Học</InputLabel>             
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={course}
                    onChange={handleChange}
                    autoWidth
                    label='Khóa Học'
                    helperText='Level chưa được chọn'
                >
                    {courses && courses.map((course) => (                 
                            <MenuItem key={course._id}  value={course._id}>{course.courseName} ({course.category})</MenuItem>                         
                    ))}
                </Select>   
            </FormControl>
        </div>
    );
}
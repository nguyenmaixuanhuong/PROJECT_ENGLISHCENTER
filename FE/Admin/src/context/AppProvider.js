import React, { useContext, useEffect, useState } from 'react'
import { getListCourse } from '../services/course.api';
import { getListStudent } from '../services/student.api.js'
import { getListTeacher } from '../services/teacher.api.js'
import { getLevels } from '../services/levels.api.js';
import { getAllClass, getClassByCourse } from '../services/class.api.js';
import { getRooms } from '../services/room.api.js';
import axios from 'axios';
import { format,parseISO,isValid } from 'date-fns';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [courses, setCourses] = useState(null);
    const [students, setStudents] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [levels, setLevels] = useState(null);
    const [classes, setClasses] = useState(null);
    const [rooms, setRooms] = useState(null);

// load course
    async function loadCourses() {
        const data = await getListCourse();
        setCourses(data);
    }
    useEffect(() => {
        loadCourses();
    }, [])

// load Student
    async function loadStudents() {
        try {
            const data = await getListStudent();
            setStudents(data)
        } catch (error) {
            console.error('Error loading students:', error);
        }
    }
    useEffect(() => {
        loadStudents();
    }, []);

// Load Teacher
    async function loadTeachers() {
        try {
            const data = await getListTeacher();
            setTeachers(data)
        } catch (error) {
            console.error('Error loading Teachers:', error);
        }
    }
    useEffect(() => {
        loadTeachers();
    }, []);


// load Levels
    useEffect(() => {
        async function loadLevels() {
            try {
                const data = await getLevels();
                setLevels(data)
            } catch (error) {
                console.error('Error loading Levels:', error);
            }
        }
        loadLevels();
    }, []);

    // Load Classes trong Course
    async function loadClassesByCourse(id) {
        try {
            const data = await getClassByCourse(id);
            setClasses(data);
        } catch (error) {
            console.error('Error loading Levels:', error);
        }   
    }
    useEffect(() => {
        loadClassesByCourse();
    },[])

// Load All Class
    async function loadAllClasses() {
        try {
            const data = await getAllClass();
            setClasses(data);
        } catch (error) {
            console.error('Error loading Levels:', error);
        }   
    }
    useEffect(() => {
        loadAllClasses();
    },[])

    // Load Rooms 
    async function loadRooms() {
        try {
            const data = await getRooms();
            setRooms(data);
        } catch (error) {
            console.error('Error loading Rooms:', error);           
        }
    }
    useEffect(() => {
        loadRooms();
    },[])


// upLoad Image on Cloud Storage
    async function uploadImage(image, folder) {
        const cloud_name = `dhvgsmsf2`
        const preset_name = `imageupload`
        const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
        const formData = new FormData();
        const url = []
        formData.append('upload_preset', preset_name);
        formData.append('folder', folder);
        formData.append('file', image);
        await axios.post(api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => { url.push(response.data.secure_url); })
            .catch((error) => { return error })
        return url;
    };

    // FormatDate 
     function formatDate(date){
        const dateObj = parseISO(date);
        if (isValid(dateObj)) {
            const formattedDate = format(dateObj, 'dd/MM/yyyy');
            return formattedDate// Kết quả: 20/02/2024 17:00:00
        } else {
          return '22/11/2002';
        }
    }
    return (
        <AppContext.Provider value={{ courses, students, teachers, levels, classes, rooms,loadStudents, loadTeachers, loadCourses, uploadImage,loadClassesByCourse,loadAllClasses,loadRooms,formatDate }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext);
};
import React, { useContext, useEffect, useState } from 'react'
import { getListCourse } from '../services/course.api';
import { getListStudent } from '../services/student.api.js'
import { getListTeacher } from '../services/teacher.api.js'
import { getLevels } from '../services/levels.api.js';
import { getAllClass, getClassByCourse } from '../services/class.api.js';
import axios from 'axios';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [courses, setCourses] = useState(null);
    const [students, setStudents] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [levels, setLevels] = useState(null);
    const [classes, setClasses] = useState(null);
    async function loadCourses() {
        const data = await getListCourse();
        setCourses(data);
    }
    useEffect(() => {
        loadCourses();
    }, [])

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
    return (
        <AppContext.Provider value={{ courses, students, teachers, levels, classes,loadStudents, loadTeachers, loadCourses, uploadImage,loadClassesByCourse,loadAllClasses }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    return useContext(AppContext);
};
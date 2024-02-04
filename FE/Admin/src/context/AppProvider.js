import React, { useContext, useEffect, useState } from 'react'
import {getListCourse} from '../services/course.api';
import {getListStudent} from '../services/student.api.js'
import {getListTeacher} from '../services/teacher.api.js'
import { getLevels } from '../services/levels.api.js';
export const AppContext = React.createContext();

export default function AppProvider({children}){
    const [courses, setCourses] = useState(null);
    const [students, setStudents] = useState(null);
    const [teachers, setTeachers] = useState(null);
    const [levels, setLevels] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getListCourse();
            setCourses(data);
        }
        fetchData();
    }, [])

    useEffect(()=>{    
        loadStudents();
    }, []);
    async function loadStudents(){
        try {
            const data = await getListStudent();
            setStudents(data)
        } catch (error) {
            console.error('Error loading students:', error);
        }
    }
  
    useEffect(()=>{    
        loadTeachers();
    }, []);
    async function loadTeachers(){
        try {
            const data = await getListTeacher();
            setTeachers(data)
        } catch (error) {
            console.error('Error loading Teachers:', error);
        }
    }
    useEffect(()=>{
        async function loadLevels(){
            try {
                const data = await getLevels();
                setLevels(data)
            } catch (error) {
                console.error('Error loading Levels:', error);
            }
        }
        loadLevels();
    },[]);
    return (
        <AppContext.Provider value={{courses,students,teachers,levels,loadStudents,loadTeachers}}>
            {children}
        </AppContext.Provider>
      )
}

export const useApp = () => {
    return useContext(AppContext);
};
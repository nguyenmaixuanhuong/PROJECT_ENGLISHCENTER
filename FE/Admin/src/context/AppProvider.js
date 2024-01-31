import React, { useContext, useEffect, useState } from 'react'
import {getListCourse} from '../services/course.api';
import {getListStudent} from '../services/student.api.js'
export const AppContext = React.createContext();

export default function AppProvider({children}){
    const [courses, setCourses] = useState(null);
    const [students, setStudents] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getListCourse();
            setCourses(data);
        }
        fetchData();
    }, [])

    useEffect(()=>{
        async function loadStudent(){
            const data = await getListStudent();
            setStudents(data)
        }
        loadStudent();
    }, []);
    async function loadStudents(){
        try {
            const data = await getListStudent();
            setStudents(data)
        } catch (error) {
            console.error('Error loading students:', error);
        }
        
    }
  
    return (
        <AppContext.Provider value={{courses,students,loadStudents}}>
            {children}
        </AppContext.Provider>
      )
}

export const useApp = () => {
    return useContext(AppContext);
};
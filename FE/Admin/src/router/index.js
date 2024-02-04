import HomePage from "../pages/HomePage";
import Course from "../pages/Courses/Course";
import Student from "../pages/Student/Student";
import AddStudent from "../pages/Student/AddStudent";
import UpdateInforStudent from "../pages/Student/UpdateInforStudent";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login/Login";
import Teacher from "../pages/Teacher/Teacher";
import AddTeacher from "../pages/Teacher/AddTeacher";
import UpdateTeacher from "../pages/Teacher/UpdateInforTeacher";
const routes = [
    {path: '/', page: HomePage},
    {path: '/course', page: Course,},
    {path: '/student', page: Student,},
    {path: '/addstudent', page: AddStudent},
    {path: '/updatestudent/:id', page: UpdateInforStudent},
    {path: '/login', page: Login,layout: LoginLayout},
    {path: '/teachers', page: Teacher},
    {path: '/addteacher', page: AddTeacher},
    {path: '/updateteacher/:id', page: UpdateTeacher},
    
]

export default routes;
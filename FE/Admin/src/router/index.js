import HomePage from "../pages/HomePage";
import Course from "../pages/Courses/Course";
import Student from "../pages/Student/Student";
import AddStudent from "../pages/Student/AddStudent";
import UpdateInforStudent from "../pages/Student/UpdateInforStudent";
const routes = [
    {path: '/', page: HomePage},
    {path: '/course', page: Course,},
    {path: '/student', page: Student,},
    {path: '/addstudent', page: AddStudent},
    {path: '/updatestudent/:id', page: UpdateInforStudent}
]

export default routes;
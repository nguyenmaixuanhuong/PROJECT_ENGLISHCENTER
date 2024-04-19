import HomeLayout from "../layouts/MainLayout/HomeLayout";
import LoginLayout from "../layouts/StudyLayout/LoginLayout/index.jsx";
import DefaultLayoutStudy from "../layouts/StudyLayout/DefaultLayout/index.jsx";

import HomePage from "../pages/HomePage/HomePage.jsx";
import CoursePage from "../pages/Course/Course.jsx";
import CourseDetail from "../pages/CourseDetail/CourseDetail.jsx";
import Login from "../pages/Login/Login.jsx";
import MainPage from "../pages/Study/MainPage/MainPage.jsx";
import ClassPage from "../pages/Study/ClassPage/ClassPage.jsx";
import Document from "../pages/Study/ClassPage/Document.jsx";
import PersonInfor from "../pages/Study/PersonInfor/PersonInfor.jsx";
import Schedule from "../pages/Study/SchedulePage/Schedule.jsx";
import TeacherPage from "../pages/TeacherPage/TeacherPage.jsx";
import AboutPage from "../pages/About/AboutPage.jsx";
import DetailAssignment from "../components/Class/Exercise/DetailAssignment.jsx";
const routes = [
    {path: '/', page: HomePage, layout:HomeLayout},
    {path: '/about', page: AboutPage},
    {path: '/teacher', page: TeacherPage},
    {path: '/course/:category', page: CoursePage},
    {path: '/coursedetail/:id', page: CourseDetail},
    {path: '/login', page: Login, layout: LoginLayout},
    {path: '/study', page: MainPage, layout: DefaultLayoutStudy},
    {path: '/class/:id', page: ClassPage, layout: DefaultLayoutStudy},
    {path: '/document', page: Document, layout: LoginLayout},
    {path: '/person', page: PersonInfor, layout: DefaultLayoutStudy},
    {path: '/schedule', page: Schedule, layout: DefaultLayoutStudy},
    {path: '/assignment/:id', page: DetailAssignment, layout: DefaultLayoutStudy},

]

export default routes;
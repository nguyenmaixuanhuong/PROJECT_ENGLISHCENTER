import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

function Nav() {
    const [arrowPosition, setArrowPosition] = useState(null);

    const handleLinkClick = (position) => {
        setArrowPosition(position);
    };
    return (
        <div className='container_navbar'>
            <nav className='navbar_fullscreen'>
                <Typography variant="h6" component="div" color={'white'} fontWeight={700} sx={{ backgroundColor: '#001567;', padding: 2, textAlign: 'center' }}>
                    TRANG QUẢN TRỊ
                </Typography>
                <ul class="nav nav-tabs flex-column">
                    <li class="nav-item">
                        <Link className='nav-link' to="/" onClick={() => handleLinkClick("Trang chủ")}>
                            {arrowPosition === "Trang chủ" && <ArrowRightIcon />}
                            Trang chủ</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/course" onClick={() => handleLinkClick("Khóa Học")}>
                            {arrowPosition === "Khóa Học" && <ArrowRightIcon />}Khóa Học</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to={`/classes/all`} onClick={() => handleLinkClick("Lớp Học")}>
                            {arrowPosition === "Lớp Học" && <ArrowRightIcon />}
                            Lớp Học</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/schedule" onClick={() => handleLinkClick("Thời Khóa Biểu")}>
                            {arrowPosition === "Thời Khóa Biểu" && <ArrowRightIcon />}Thời Khóa Biểu</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/student" onClick={() => handleLinkClick("Học Viên")}>
                            {arrowPosition === "Học Viên" && <ArrowRightIcon />} Học Viên</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/teachers" onClick={() => handleLinkClick("Giáo viên")}>
                            {arrowPosition === "Giáo viên" && <ArrowRightIcon />} Giáo viên</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/register" onClick={() => handleLinkClick("Đăng kí")}>
                            {arrowPosition === "Đăng kí" && <ArrowRightIcon />} Đăng kí</Link>
                    </li>
                </ul>
                <div className='text-center nav_logo'>
                <img src="/asset/logo.png" alt="" width={150}/>
                <Typography variant="body2" component="div"  sx={{ padding: 2, textAlign: 'center' }}>
                    Trung tâm Anh Ngữ OCEAN
                </Typography>
                </div>
            </nav>
            <nav class="navbar navbar_responsive p-0 ">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <MenuIcon></MenuIcon>
                    </button>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header ">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">OceanEnglish</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <ul class="nav nav-tabs flex-column">
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/">Trang chủ</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/course">Khóa Học</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to={`/classes/all`}>Lớp Học</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/schedule">Thời Khóa Biểu</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/student">Học Viên</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/teachers">Giáo Viên</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/register">Đăng kí tư vấn khóa học</Link>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </nav>
        </div>
    )
}

export default Nav;
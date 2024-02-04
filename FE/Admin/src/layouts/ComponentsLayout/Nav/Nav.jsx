import './style.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
function Nav() {
    return (
        <div>
            <nav className='navbar_fullscreen'>
                <ul class="nav nav-tabs flex-column">
                    <li class="nav-item">
                        <Link className='nav-link' to="/">Trang chủ</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/course">Khóa Học</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/course">Lớp Học</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/course">Thời Khóa Biểu</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/student">Học Viên</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/teachers">Giáo Viên</Link>
                    </li>
                    <li class="nav-item">
                        <Link className='nav-link' to="/course">Đăng kí tư vấn khóa học</Link>
                    </li>
                </ul>
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
                                        <Link className='nav-link'  to="/course">Khóa Học</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/course">Lớp Học</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/course">Thời Khóa Biểu</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/student">Học Viên</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/teachers">Giáo Viên</Link>
                                    </li>
                                    <li class="nav-item" data-bs-dismiss="offcanvas">
                                        <Link className='nav-link' to="/course">Đăng kí tư vấn khóa học</Link>
                                    </li>
                                </ul>
                            </ul>
                            <form class="d-flex mt-3" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
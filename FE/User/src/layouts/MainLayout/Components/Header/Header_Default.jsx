import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './header.style.scss'
import NavResponsive from './navResponsive'
function Header() {
    return (
        <div className="header-tranparents isscroll" >
            <div className="container">
                <div className="row header">
                    <div className="logo col-xl-3 col-3 pt-3">
                        <Link to="/">
                            <img src="/assets/image/logo/logo.png" width={150} alt="" />
                        </Link>
                    </div>
                    <div className="navbar-header col-xl-9 col-9">
                        <div className="nav-item">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" className='nav-item_btn phone' color='error' href="tel:+84795924466"><LocalPhoneIcon />Gọi điện tư vấn</Button>
                                <Link to='/login'>
                                    <Button variant="contained" className='nav-item_btn study-system' color='error'><BookIcon />Hệ Thống Học Tập</Button>
                                </Link>
                            </Stack>
                            <div className="nav-responsive">
                                <NavResponsive />
                            </div>
                        </div>
                        <div className="nav-item nav-fullwidth">
                            <Link to="/" className='nav-item_link'>
                                <Button variant="text">Trang Chủ</Button>
                            </Link>
                            <Link to="/about" className='nav-item_link'>
                                <Button variant="text">Về Ocean English</Button>
                            </Link>
                            <div className='nav-item_link '>
                                <Button className='courses' variant="text">Các Khóa Học <ArrowDropDownIcon></ArrowDropDownIcon> </Button>
                                <div className='list-course'>
                                    <Paper>
                                        <MenuList sx={{padding:2}}>
                                            <Link to="/course/Trẻ em" className='link-course'>
                                                <MenuItem sx={{padding: 1 ,borderBottom: '1px solid rgb(215, 215, 215)'}}>
                                                    Khóa dành cho trẻ em
                                                </MenuItem>
                                            </Link>
                                            <Link to="/course/Thiếu niên" className='link-course'>
                                                <MenuItem sx={{padding: 1 ,borderBottom: '1px solid rgb(215, 215, 215)'}}>
                                                    Khóa dành cho Thiếu niên
                                                </MenuItem>
                                            </Link>
                                            <Link to="/course/Người lớn" className='link-course'>
                                                <MenuItem sx={{padding: 1 ,borderBottom: '1px solid rgb(215, 215, 215)'}}>
                                                    Khóa dành cho Người lớn
                                                </MenuItem>
                                            </Link>
                                        </MenuList>
                                    </Paper>
                                </div>
                            </div>
                            <Link to="/teacher" className='nav-item_link'>
                                <Button variant="text">Đội Ngũ Giáo Viên</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
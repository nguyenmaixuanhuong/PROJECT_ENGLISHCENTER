import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Link from 'next/link';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logoutUser } from '@/store/userSlice';


function ResponsiveAppBar() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);

    };
    const handleBack = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        // Thiết lập cookies
        Cookies.set('role', null, { path: '/', secure: true, sameSite: 'Strict' });
        Cookies.set('userId', null, { path: '/', secure: true, sameSite: 'Strict' });

        // Chuyển hướng đến trang khác
        window.location.href = 'http://localhost:3000/study';
    };
    return (
        <AppBar position="fixed" variant='outlined' sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href='http://localhost:3000/'>
                        <Image src="/images/logo/logo.png" width={80} height={50}></Image>
                    </a>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#001567',
                            textDecoration: 'none',
                        }}
                    >
                        OCEAN ENGLISH
                    </Typography>

                    {
                        user ?
                            <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip title="Support">
                                        <ContactSupportIcon color='action' ></ContactSupportIcon>
                                    </Tooltip>
                                    <Typography
                                        variant='body2'
                                        color={"black"}
                                        margin={1}
                                    >
                                        {user?.fullName}
                                    </Typography>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </div>

                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Button onClick={handleBack} textAlign="center">Hệ Thống học tập </Button>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Button href='/exams' textAlign="center">Bài kiểm tra của tôi </Button>
                                    </MenuItem>

                                </Menu>
                            </Box>

                            : <Button sx={{ ml: 'auto' }} color='error' variant='contained' href='http://localhost:3000/login'>Đăng nhập hệ thống</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;

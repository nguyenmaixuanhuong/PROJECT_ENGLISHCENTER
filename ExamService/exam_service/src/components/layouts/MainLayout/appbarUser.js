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

const pages = ["Bài Kiểm Tra", "Lưu Trữ "];
const settings = ['Hệ thống học tập'];

function AppBarUser() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedPage, setSelectedPage] = React.useState("Bài Kiểm Tra");
    const [loading, setLoading] = React.useState(true);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // When the component mounts, check if the user information is available
        if (user !== undefined) {
            setLoading(false); // Stop loading once the user data is available
        }
    }, [user]);

    const handleClick = (page) => {
        setSelectedPage(page);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleBack = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        // Set cookies
        Cookies.set('role', null, { path: '/', secure: true, sameSite: 'Strict' });
        Cookies.set('userId', null, { path: '/', secure: true, sameSite: 'Strict' });

        // Redirect to another page
        window.location.href = 'http://localhost:3000/study';
    };

    if (loading) {
        return null; // You can return a loading spinner here if needed
    }

    return (
        <AppBar position="fixed" variant='outlined' sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Image src="/images/logo/logo.png" width={80} height={50} />
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
                        !user ? (
                            <Button sx={{ ml: 'auto' }} color='error' variant='contained' href='http://localhost:3000/login'>Đăng nhập hệ thống</Button>
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="black"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'flex', md: 'none' },
                                            justifyContent: "center"
                                        }}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
                                    {pages.map((page) => (
                                        <Link key={page} style={{ textDecoration: "none" }} href={page === "Bài Kiểm Tra" ? "/exams" : "history"}>
                                            <Button
                                                onClick={() => handleClick(page)}
                                                sx={{
                                                    my: 2,
                                                    color: "black",
                                                    display: 'block',
                                                    mx: 10,
                                                    fontWeight: selectedPage === page ? 'bold' : '',
                                                }}
                                            >
                                                {page}
                                            </Button>
                                        </Link>
                                    ))}
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Tooltip title="Support">
                                            <ContactSupportIcon color='action' />
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
                                            <Button onClick={handleBack} textAlign="center">Hệ thống học tập </Button>
                                        </MenuItem>

                                    </Menu>
                                </Box>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppBarUser;

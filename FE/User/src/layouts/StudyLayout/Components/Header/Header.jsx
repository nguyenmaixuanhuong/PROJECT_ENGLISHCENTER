import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Notifications from '../../../../components/Notifications/Notifications'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserSuccess } from '../../../../store/UserSlice'
import './Header.style.scss';
import { Divider } from '@mui/material';

function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = useSelector((state) => state.user?.user)
    const dispatch = useDispatch();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
        dispatch(logoutUserSuccess());
    }
    return (
        <AppBar position="fixed">
            <Container className='study_header' maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="study_logo">
                        <img src="./assets/image/logo/logo.png" alt="" width={90} />
                    </div>
                    <Typography
                        variant="h5"
                    >
                        LỚP HỌC
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Notifications />
                        <Typography variant="body2" sx={{ display: 'inline', paddingRight: 1, ml: 2 }} >
                            {user.fullName}
                        </Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.fullName} src={user.account.avatar ? user.account.avatar.url : ''} />
                            </IconButton>
                        </Tooltip>
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
                            <Link to='/person' className='text-direction_none '>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Thông tin cá nhân</Typography>
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={logout}>
                                <Typography color='primary' sx={{ ml: 3 }}>Đăng xuất</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
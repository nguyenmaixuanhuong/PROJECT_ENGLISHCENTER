import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import './style.scss'
export default function MenuAppBar() {
    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        Navigate('/login');
    }
    return (
        <Box  sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='appbar'>
                    <Typography ml={5} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       
                    </Typography>
                    {(
                        <div className='d-flex align-items-center'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <p className=' mb-0'>Admin</p>
                            <Tooltip title="Đăng Xuất">
                                <IconButton onClick={handleLogout}>
                                    <LogoutRoundedIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
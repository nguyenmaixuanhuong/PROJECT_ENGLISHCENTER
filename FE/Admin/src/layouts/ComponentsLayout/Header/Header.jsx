import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
export default function MenuAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    
                    <Typography  ml={5} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
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
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
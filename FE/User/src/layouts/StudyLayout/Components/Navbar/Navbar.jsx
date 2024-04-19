import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from '../../../../store/ClassSlice'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import './Navbar.style.scss';
import { removeNotify } from '../../../../store/NotifiySlice';
export default function NavBar() {
    const [classes, setClasses] = React.useState([])
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role)
    const user = useSelector((state) => state.user.user)
    const fullName = useSelector((state) => state.user.user?.fullName)
    const clearNotify = () => {
        dispatch(removeNotify());
    }
    React.useEffect(() => {
        const obj = { id: user._id, role: role }
        dispatch(getClasses(obj)).then((result) => {
            if (result.payload) {
                setClasses(result.payload)
            }
        })
    }, [user, role])
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
            <Paper sx={{ height: "100%" }}>
                <div className="navbar-infor">
                    <Typography variant="body1" color={'white'} sx={{ display: 'inline', alignSelf: 'center' }} >
                        {fullName}
                    </Typography>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={user.account?.avatar.url} />
                    </IconButton>
                </div>
                <Divider />
                <MenuList sx={{ height: "100%" }}>
                    <Link className='text-direction_none text-dark' to='/study' >
                        <MenuItem className='menu-item'>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Màn hình chính</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link className='text-direction_none text-dark' to='/study'>
                        <MenuItem className='menu-item'>
                            <ListItemIcon>
                                <CalendarTodayIcon />
                            </ListItemIcon>
                            <ListItemText>Thời khóa biểu</ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem className='menu-item'>
                        <ListItemIcon>
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText>Các lớp học</ListItemText>
                    </MenuItem>
                    {classes && classes.map(item => (
                        <Link className='text-direction_none ' to={`/class/${item._id}`} onClick={clearNotify}>
                            <MenuItem className='class-item' sx={{ paddingLeft: 4 }}>
                                <ListItemText >{item.className}</ListItemText>
                            </MenuItem>
                        </Link>
                    ))}
                </MenuList>
            </Paper>
        </Box>
    );

    return (
        <div className="">
            <div className="navbar-fullwight">
                <Paper className='nav-list'>
                    <MenuList sx={{ height: "100%" }}>
                        <Link className='text-direction_none text-dark' to='/study' >
                            <MenuItem className='menu-item'>
                                <ListItemIcon>
                                    <HomeIcon color='warning' />
                                </ListItemIcon>
                                <ListItemText>Màn hình chính</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link className='text-direction_none text-dark' to='/schedule'>
                            <MenuItem className='menu-item'>
                                <ListItemIcon>
                                    <CalendarTodayIcon color='error' />
                                </ListItemIcon>
                                <ListItemText>Thời khóa biểu</ListItemText>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <MenuItem className='menu-item'>
                            <ListItemIcon>
                                <SchoolIcon color='primary' />
                            </ListItemIcon>
                            <ListItemText>Các lớp học</ListItemText>
                        </MenuItem>
                        {classes && classes.map(item => (
                            <Link className='text-direction_none' to={`/class/${item._id}`} onClick={clearNotify} >
                                <MenuItem className='class-item' sx={{ paddingLeft: 4 }}>
                                    <ListItemText>{item.className}</ListItemText>
                                </MenuItem>
                            </Link>

                        ))}
                    </MenuList>
                </Paper>
            </div>
            <div className="navbar-responsive">
                <div>
                    <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: 'white', fontSize: 30 }} /></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications, isCheckedNotify } from '../../services/information';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './Notification.style.scss'
import { setNotify } from '../../store/NotifiySlice';
import { Link } from 'react-router-dom';
import { setTabIndex } from '../../store/TabSlice';
export default function NotificationsComponent() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const account = useSelector((state) => state.user.user?.account)
    const [number, setNumber] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);
    const [render, setRender] = React.useState(false)

    React.useEffect(() => {
        async function fetchData() {
            const data = await Notifications(account._id);
            if (data) {
                let countUnchecked = data?.reduce((count, notification) => {
                    if (!notification.isChecked) {
                        return count + 1;
                    } else {
                        return count;
                    }
                }, 0);
                setNotifications(data);
                setNumber(countUnchecked);
            }
        }
        fetchData();
    }, [account._id, render])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickNotify = async (idNotify,idInfor) => {
        const notify = await isCheckedNotify(account._id, idNotify);
        if (notify.status !== 200) {
            alert('Lỗi')
        }
        else {
            setRender(!render)
            dispatch(setNotify(idInfor));
            dispatch(setTabIndex('1'));
        }
    }

    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Badge badgeContent={number} color="primary" overlap="circular">
                        <NotificationsIcon sx={{ color: 'white' }}></NotificationsIcon>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {notifications.length !== 0 ? notifications?.map((notification) => (
                    <Link className='text-direction_none' to={{
                        pathname: `/class/${notification.information?.class?._id}`,
                    }}>
                        <MenuItem onClick={() => {
                            handleClickNotify(notification._id, notification.information?._id);
                            handleClose()
                        }}>
                            <div className={notification.isChecked ? "notification " : 'notification uncheck'}>
                                <div className="notification-content">
                                    <Avatar src={notification.user?.account.avatar?.url}></Avatar>
                                    <div className="notification-item">
                                        <p style={{ fontWeight: 500 }}>{notification.user?.fullName} : Đã {notification.action}</p>
                                        <p>Vào lớp {notification.information.class?.className}</p>
                                    </div>
                                    {notification.isChecked ? '' : <FiberManualRecordIcon fontSize='10px' sx={{ ml: 2, color: 'green' }} />}
                                </div>
                                <span className='notification-time'>{new Date(notification.time).toLocaleString()}</span>
                            </div>
                        </MenuItem>
                    </Link>
                ))
                    : <p className='p-3'>Hiện tại chưa có thông báo mới nào</p>
                }
            </Menu>
        </React.Fragment>
    );
}
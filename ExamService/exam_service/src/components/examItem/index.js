import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setExam } from '@/store/examSlice';
import styles from './examItem.module.scss'
import ModalConfirmDelete from './modalConfirmDelete';
import { isSubmitted } from '@/pages/api/isSubmitted';
export default function ExemItiem(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userId = useSelector((state) => state.user?.user?._id);
    const role = useSelector((state) => state.user?.role);
    const [openModal, setOpenModal] = React.useState(false);
    const [submitted, setIsSubmitted] = React.useState(false);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        const checkSubmit = async () => {
            if (props.exam && props.exam._id) {
                const submitted = await isSubmitted(userId, props.exam._id);

                setIsSubmitted(submitted);
            }
        };

        checkSubmit();
    }, [props.exam]);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteExamDraft = async () => {
        const res = await fetch('/api/deleteExamDraft', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, draftId: props.exam?._id })
        });
        if (res.status === 200) {
            toast.success('Deleted successfully')
            props?.handleRender();
        }
        else {
            toast.error('Đã có lỗi xảy ra');
        }
    }

    const deleteExam = async () => {
        const res = await fetch('/api/deleteExam', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ examId: props.exam?._id })
        });
        if (res.status === 200) {
            toast.success('Deleted successfully')
            props?.handleRender();
        }
        else {
            toast.error('Đã có lỗi xảy ra');
        }
    }
    const handleDelete = async () => {
        if (props?.status === 'end') {
            deleteExam();
        }
        else {
            setOpenModal(true);
        }
    };


    const handleExamDetail = () => {
        const exam = { ...props.exam, status: props.status }
        dispatch(setExam(exam));
        router.push(`/exams/create-exam?status=${props.status}`)
    }

    const handleUpdateExam = () => {
        if (!props.exam.summary.startTime || new Date(props.exam.summary.startTime) < Date.now()) {
            toast.error('Bài kiểm tra đang diễn ra, bạn không thể chỉnh sửa nữa')
        }
        else {
            const exam = { ...props.exam, status: 'update' }
            dispatch(setExam(exam));
            router.push(`/exams/create-exam?status=update`)
            handleClose();
        }
    }
    return (
        <Box sx={{ p: 1 }}>
            {role === 'Teacher' ?
                <Button onClick={handleExamDetail} >
                    <Card sx={{ minWidth: 275, maxWidth: 280, p: 1, maxHeight: 320 }} >
                        <CardContent>
                            <Typography className={styles.exam_title} variant="body2" fontWeight={"bold"} mb={3} textAlign={"center"} >
                                {props.exam?.summary.title ? props.exam?.summary.title : 'Chưa có tiêu đề'}
                            </Typography>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <AlarmOnIcon sx={{ mr: 2 }} color="success"></AlarmOnIcon>
                                <Typography sx={{ mb: 1.5 }} variant="body2" >
                                    {props.exam.summary?.startTime ? new Date(props.exam.summary?.startTime).toLocaleTimeString() : '_ '} -
                                    {props.exam.summary?.startTime ? new Date(props.exam.summary?.startTime).toLocaleDateString() : " _"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <AlarmOffIcon sx={{ mr: 2 }} color="error"></AlarmOffIcon>
                                <Typography sx={{ mb: 1.5 }} variant="body2" >
                                    {props.exam.summary?.endTime ? new Date(props.exam.summary?.endTime).toLocaleTimeString() : '_ '} -
                                    {props.exam.summary?.endTime ? new Date(props.exam.summary?.endTime).toLocaleDateString() : '_ '}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", mb: 2 }}>
                                <PendingActionsIcon sx={{ mr: 2 }} color="primary"></PendingActionsIcon>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    Thời gian làm bài: {props.exam.summary?.times ? props.exam.summary?.times : 0} phút
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <GroupsIcon sx={{ mr: 2 }} color="action"></GroupsIcon>
                                {props.exam.summary?.scope?.isPublic ?
                                    <Typography variant="body2">
                                        Công khai
                                    </Typography>
                                    : <Typography variant="body2">
                                        Giới hạn
                                    </Typography>
                                }
                            </Box>
                            <ModalConfirmDelete deleteExam={deleteExam} openModal={openModal} />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            {role === 'Teacher' ?
                                <div style={{ zIndex: 100 }}>
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls={open ? 'long-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'long-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={(e) => {
                                            e.stopPropagation();
                                            handleClose()
                                        }}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 40 * 4.5,
                                                width: '20ch',
                                            },
                                        }}
                                    >
                                        {props?.status === 'loading' ?
                                            <MenuItem onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteExamDraft();
                                                handleClose();
                                            }}>
                                                <DeleteIcon color='action' sx={{ mr: 2 }} /> Xóa
                                            </MenuItem>
                                            : <>
                                                {props.status !== 'end' ?
                                                    <>
                                                        <MenuItem onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClose();
                                                        }}>
                                                            <ShareIcon color='action' sx={{ mr: 2 }}></ShareIcon>  Chia sẻ
                                                        </MenuItem>
                                                        <MenuItem onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdateExam();
                                                        }}>
                                                            <FileCopyIcon color='action' sx={{ mr: 2 }} /> Chỉnh sửa
                                                        </MenuItem>
                                                    </>
                                                    : ''
                                                }
                                                <MenuItem onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete();
                                                    handleClose();
                                                }}>
                                                    <DeleteIcon color='action' sx={{ mr: 2 }} /> Xóa
                                                </MenuItem>
                                            </>
                                        }
                                    </Menu>

                                </div>
                                : ''
                            }
                        </CardActions>
                    </Card>
                </Button>
                :
                <Button >
                    <Card sx={{ minWidth: 275, maxWidth: 280, p: 1 }} >
                        <CardContent>
                            <Typography className={styles.exam_title} variant="body2" fontWeight={"bold"} mb={3} textAlign={"center"} component="div">
                                {props.exam?.summary.title ? props.exam?.summary.title : 'Chưa có tiêu đề'}
                            </Typography>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <AlarmOnIcon sx={{ mr: 2 }} color="success"></AlarmOnIcon>
                                <Typography sx={{ mb: 1.5 }} variant="body2" >
                                    {props.exam.summary?.startTime ? new Date(props.exam.summary?.startTime).toLocaleTimeString() : '_ '} -
                                    {props.exam.summary?.startTime ? new Date(props.exam.summary?.startTime).toLocaleDateString() : " _"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <AlarmOffIcon sx={{ mr: 2 }} color="error"></AlarmOffIcon>
                                <Typography sx={{ mb: 1.5 }} variant="body2" >
                                    {props.exam.summary?.endTime ? new Date(props.exam.summary?.endTime).toLocaleTimeString() : '_ '} -
                                    {props.exam.summary?.endTime ? new Date(props.exam.summary?.endTime).toLocaleDateString() : '_ '}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", mb: 2 }}>
                                <PendingActionsIcon sx={{ mr: 2 }} color="primary"></PendingActionsIcon>
                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    Thời gian làm bài: {props.exam.summary?.times ? props.exam.summary?.times : 0} phút
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <GroupsIcon sx={{ mr: 2 }} color="action"></GroupsIcon>
                                {props.exam.summary?.scope?.isPublic ?
                                    <Typography variant="body2">
                                        Công khai
                                    </Typography>
                                    : <Typography variant="body2">
                                        Giới hạn
                                    </Typography>
                                }
                            </Box>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            {!submitted ?
                                <>
                                    {props.status === 'now' ?
                                        <Button variant='contained' onClick={() => { router.push(`/test?id=${props.exam._id}`) }}> Vào Thi </Button>
                                        : ''
                                    }
                                </>
                                : <Button variant='contained' onClick={() => { router.push(`/result/${props.exam._id}`) }}> Xem kết quả </Button>
                            }
                        </CardActions>
                    </Card>
                </Button>
            }

        </Box>

    );
}

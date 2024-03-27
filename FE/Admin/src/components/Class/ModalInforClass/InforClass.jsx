import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { useState, useCallback } from 'react'
import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createClass, updateClass } from '../../../services/class.api';
import ListCourse from '../../course/ListCourse/ListCourse'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    p: 4,
};

export default function InforClass(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        className: '',
        course: '',
        startDay: null,
        finishDay: null,
    })
    const [errors, setErrors] = useState({
        className: '',
        course: '',
        startDay: '',
        finishDay: '',
    });
    React.useEffect(() => {
        setFormData({
            className: props.class ? props.class.className : '',
            course: props.class ? props.class.course._id : '',
            startDay: props.class ? dayjs(props.class.startDay) : null,
            finishDay: props.class ? dayjs(props.class.finishDay) : null,
        });
    }, [props.class]);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'className':
                return value.trim() === '' ? 'Tên không được để trống' : '';
            case 'course':
                if (!value) {
                    return 'Khóa học không được để trống'
                }
                else return '';
            case 'startDay':
                if (!value) {
                    return 'Ngày bắt đầu không được để trống';
                }
                if (value > formData.finishDay) {
                    return 'Ngày bắt đầu không được nhỏ hơn ngày bắt đầu';
                }
                else return '';
            case 'finishDay':
                if (!value) {
                    return 'Ngày kết thúc không được để trống';
                }
                if (value < formData.startDay) {
                    return 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu';
                }
                else return '';
            default:
                return '';
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
    const handleCourseChange = useCallback((selectedCourse) => {
        setFormData({ ...formData, course: selectedCourse });
    }, [formData]);
    const handleChangeStartDay = (date) => {
        const error = validateField('startDay', date);
        setFormData({ ...formData, startDay: date });
        setErrors((prevErrors) => ({ ...prevErrors, "startDay": error }));
    };
    const handleChangeFinishDay = (date) => {
        const error = validateField('finishDay', date);
        if (date > formData.startDay) {
            setErrors((prevErrors) => ({ ...prevErrors, "startDay": '' }));
        }
        setFormData({ ...formData, finishDay: date });
        setErrors((prevErrors) => ({ ...prevErrors, "finishDay": error }));
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    const HandleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra lỗi khi người dùng nhấn nút Gửi
        const fieldErrors = {};
        Object.keys(formData).forEach((fieldName) => {
            const error = validateField(fieldName, formData[fieldName]);
            fieldErrors[fieldName] = error;
        });
        setErrors(fieldErrors);
        const hasErrors = Object.values(fieldErrors).some((error) => !!error);
        if (!hasErrors) {
            if (props.class) {
                if (updateClass(props.class._id, formData)) {
                    setSuccessMessage('Cập nhật thông tin lớp học thành công!');
                    setOpenSnackbar(true);
                    // props.loadClasses();
                }
                else {
                    setSuccessMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setOpenSnackbar(true);
                }
            }
            else {
                if (createClass(formData)) {
                    setSuccessMessage('Thêm thông tin lớp học thành công!');
                    setErrorMessage('')
                    setOpenSnackbar(true);
                    // props.loadClasses();

                }
                else {
                    setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setSuccessMessage('');
                    setOpenSnackbar(true);
                }
            }
        } else {
            // Dữ liệu không hợp lệ, hiển thị hoặc xử lý lỗi
            console.log('Form contains errors');
        }
    };
    return (
        <div>
            {props.class ?
                <Button variant='text' sx={{ fontWeight: 700 }} onClick={handleOpen}> <EditIcon fontSize='small'></EditIcon>Cập nhật</Button>
                :
                <Tooltip title="Thêm lớp học">
                    <Fab onClick={handleOpen} color="success" aria-label="add" >
                        <AddIcon />
                    </Fab>
                </Tooltip>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton onClick={handleClose} sx={{float:'right', marginBottom: 3}}>
                        <CloseIcon ></CloseIcon>
                    </IconButton>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center',}}>
                        THÔNG TIN LỚP HỌC
                    </Typography>

                    <form onSubmit={HandleSubmit}>
                        <ListCourse courseSelected={formData?.course} onChangeCourse={handleCourseChange} ></ListCourse>
                        {errors.course &&
                            <Typography variant="caption" color="red" sx={{ marginLeft: 2 }}>
                                {errors.course}
                            </Typography>
                        }
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Tên Lớp Học"
                                variant="outlined"
                                margin="normal"
                                name="className"
                                value={formData.className}
                                onChange={handleInputChange}
                            // error={!!errors.className}
                            />
                            <Typography variant="caption" color="red" sx={{ marginLeft: 2 }}>
                                {errors.className}
                            </Typography>
                        </FormControl>
                        <div className="d-flex justify-content-between mb-3">
                            <FormControl sx={{ width: '48%' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Ngày bắt đầu"
                                        name="startDay"
                                        value={formData.startDay}
                                        format='DD/MM/YYYY'
                                        onChange={handleChangeStartDay}
                                        renderInput={(params) => <TextField {...params} />}
                                        disablePast
                                    />
                                </LocalizationProvider>
                                <Typography variant="caption" color="red" sx={{ marginLeft: 2 }}>
                                    {errors.startDay}
                                </Typography>
                            </FormControl >
                            <FormControl sx={{ width: '48%' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Ngày kết thúc"
                                        name="finishDay"
                                        format='DD/MM/YYYY'
                                        value={formData.finishDay}
                                        onChange={handleChangeFinishDay}
                                        renderInput={(params) => <TextField {...params} />}
                                        disablePast
                                        helperText={errors.finishDay}
                                        error={!!errors.finishDay}
                                    />
                                </LocalizationProvider>
                                <Typography variant="caption" color="red" sx={{ marginLeft: 2 }}>
                                    {errors.finishDay}
                                </Typography>
                            </FormControl >
                        </div>
                        {!props.class ? <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                            Thêm
                        </Button> :
                            <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                                Update
                            </Button>
                        }
                    </form>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        {errorMessage !== '' ?
                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                                {errorMessage}
                            </MuiAlert> :
                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                                {successMessage}
                            </MuiAlert>
                        }
                    </Snackbar>
                </Box>
            </Modal>
        </div>
    );
}

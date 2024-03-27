import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useCallback, useEffect, useState } from 'react';
import validator from 'validator';
import './formInfor.style.scss';
import Levels from '../../levels/levels';
import { createTeacher, updateTeacher } from '../../../services/teacher.api'
function FormInforTeacher(props) {
    const [formData, setFormData] = useState({
        fullName: '',
        birthDay: null,
        phoneNumber: '',
        email: '',
        level: null,
    });
    const [errors, setErrors] = useState({
        fullName: '',
        birthDay: '',
        phoneNumber: '',
        email: '',
        level: '',
    });
    const handleLevelChange = useCallback((selectedLevel) => {
        setFormData({ ...formData, level: selectedLevel }); // Cập nhật giá trị level vào state của FormInforStudent
    }, [formData]);
    useEffect(() => {
        setFormData({
            fullName: props.infor ? props.infor.fullName : '',
            birthDay: props.infor ? dayjs(props.infor.birthDay) : null,
            phoneNumber: props.infor ? props.infor.phoneNumber : '',
            email: props.infor ? props.infor.email : '',
            level: props.infor ? props.infor.level._id : null,
        });
    }, [props.infor]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
    const handleDateChange = (date) => {
        const error = validateField('birthDay', date);
        setFormData({ ...formData, birthDay: date });
        setErrors((prevErrors) => ({ ...prevErrors, "birthDay": error }));
    };


    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'fullName':
                return value.trim() === '' ? 'Tên không được để trống' : '';
            case 'phoneNumber':
                if (value.trim() === '') {
                    return 'Số điện thoại không được để trống'
                }
                else if (!validator.isMobilePhone(value, 'vi-VN', { strictMode: false })) {
                    return 'Số điện thoại không hợp lệ.';
                }
                else return '';
            case 'birthDay':
                return value === null ? 'Ngày sinh không được để trống' : '';
            case 'level':
                return value === null ? 'Trình độ không được để trống' : '';
            case 'email':
                if (value.trim() === '') {
                    return 'Email không được để trống'
                }
                else if (!validator.isEmail(value)) {
                    return 'Email không hợp lệ.';
                }
                else return '';
            default:
                return '';
        }
    };
    const HandleSubmit = (e) => {
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
            if (props.infor) {
                if (updateTeacher(props.infor._id, formData)) {
                    setSuccessMessage('Cập nhật thông tin giáo viên thành công!');
                    setErrorMessage('')
                    setOpenSnackbar(true);
                }
                else {
                    setSuccessMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setSuccessMessage('')
                    setOpenSnackbar(true);
                }
            }
            else {
                if (createTeacher(formData)) {
                    setFormData({
                        fullName: '',
                        birthDay: null,
                        phoneNumber: '',
                        email: '',
                        level: null,
                    });
                    setSuccessMessage('Thêm thông tin giáo viên thành công!');
                    setErrorMessage('')
                    setOpenSnackbar(true);
                }
                else {
                    setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setSuccessMessage('')
                    setOpenSnackbar(true);
                }
            }
        } else {
            // Dữ liệu không hợp lệ, hiển thị hoặc xử lý lỗi
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
            setSuccessMessage('')
            setOpenSnackbar(true);
        }
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='formInfor'>
            <div className="btn-return">
                <Link to='/teachers'>
                    <IconButton sx={{ color: 'red' }}>
                        <Typography variant="body1">Trở Về</Typography>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>
                </Link>
            </div>
            <h3>THÔNG TIN GIÁO VIÊN</h3>
            <form onSubmit={HandleSubmit}>
                <FormControl fullWidth sx={{mb: 2}}>
                    <TextField
                        label="Tên Giáo Viên"
                        variant="outlined"
                        margin="normal"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        helperText={errors.fullName}
                        error={!!errors.fullName}
                    />
                </FormControl>
                <FormControl sx={{ width: '48%', mb:2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày Sinh"
                            name="birthDay"
                            value={formData.birthDay}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}

                            helperText={errors.birthDay}
                            error={!!errors.birthDay}
                        />
                    </LocalizationProvider>
                </FormControl >
                <FormControl sx={{ width: '48%', marginLeft: '4%' }}>
                    <TextField
                        sx={{ margin: '0' }}
                        label="Số điện thoại"
                        variant="outlined"
                        margin="normal"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        helperText={errors.phoneNumber}
                        error={!!errors.phoneNumber}
                    />
                </FormControl>
                <FormControl sx={{ width: '25%', marginTop: '16px' }}>
                    <Levels levelSelected={formData.level} onChangeLevel={handleLevelChange}
                    ></Levels>
                </FormControl>
                <FormControl sx={{ width: '70%', marginLeft: '5%',mb:3 }} >
                    <TextField
                        label="Email Giáo Viên"
                        type='email'
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        helperText={errors.email}
                        error={!!errors.email}
                    />
                </FormControl>
                {!props.infor ? <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                    Thêm
                </Button> :
                    <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                        Cập Nhật Thông Tin
                    </Button>
                }
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
            </form>
        </div>
    );
}

export default FormInforTeacher;
import * as React from 'react';
import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import validator from 'validator';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { changeInfor } from '../../../services/auth.api';
import { useDispatch } from 'react-redux';
import { updateInfor } from '../../../store/UserSlice'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    p: 4,
};
function ChangeInfor({ user, role }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullName: '',
        birthDay: null,
        phoneNumber: '',
        email: '',
        address: ''
    });
    const [errors, setErrors] = useState({
        fullName: '',
        birthDay: '',
        phoneNumber: '',
        email: '',
        address: ''
    });
    useEffect(() => {
        setFormData({
            fullName: user ? user.fullName : '',
            birthDay: user ? dayjs(user.birthDay) : null,
            phoneNumber: user ? user.phoneNumber : '',
            email: role === 'Teacher' ? user.email : '',
            address: role === 'Student' ? user.address : '',
        });
    }, [user, role]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            case 'email':
                if (role === 'Teacher' && value.trim() === '') {
                    return 'Email không được để trống'
                }
                else if (role === 'Teacher' && !validator.isEmail(value)) {
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
            if (changeInfor(user._id, role, formData)) {
                setSuccessMessage('Cập nhật thông tin thành công!');
                handleClose();
                setErrorMessage('')
                setOpenSnackbar(true);
                dispatch(updateInfor({ formData }))
            }
            else {
                setSuccessMessage('Cập nhật không thành công, vui lòng thử lại!');
                setSuccessMessage('')
                setOpenSnackbar(true);
            }
        }
        else {
            // Dữ liệu không hợp lệ, hiển thị hoặc xử lý lỗi
            console.log(errors);
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
            setSuccessMessage('')
            setOpenSnackbar(true);
        }
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Chỉnh Sửa Thông Tin</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='formInfor'>
                        <form onSubmit={HandleSubmit}>
                            <h3>THÔNG TIN CÁ NHÂN</h3>
                            <FormControl fullWidth>
                                <TextField
                                    label="Họ và tên"
                                    variant="outlined"
                                    margin="normal"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    helperText={errors.fullName}
                                    error={!!errors.fullName}
                                />
                            </FormControl>
                            <FormControl sx={{ width: '48%' }}>
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
                            {role === 'Teacher' ?
                                <FormControl fullWidth >
                                    <TextField
                                        label="Email"
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
                                :
                                <FormControl fullWidth >
                                    <TextField
                                        label="Địa chỉ"
                                        variant="outlined"
                                        margin="normal"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        helperText={errors.address}
                                        error={!!errors.address}
                                    />
                                </FormControl>
                            }
                            <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                                Cập Nhật Thông Tin
                            </Button>

                        </form>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
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
        </div>

    );
}

export default ChangeInfor;
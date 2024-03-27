import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import validator from 'validator';
import './formInfor.style.scss';
import { createStudent, updateStudent } from '../../../services/student.api'
function FormInforStudent(props) {
    const [formData, setFormData] = useState({
        fullName: '',
        birthDay: null,
        phoneNumber: '',
        address: '',
    });
    const [errors, setErrors] = useState({
        fullName: '',
        birthDay: '',
        phoneNumber: '',
        address: '',
    });
    useEffect(() => {
        setFormData({
            fullName: props.infor ? props.infor.fullName : '',
            birthDay: props.infor ? dayjs(props.infor.birthDay) : null,
            phoneNumber: props.infor ? props.infor.phoneNumber : '',
            address: props.infor ? props.infor.address : '',
        });
    }, [props.infor]);
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
                return !value ? 'Ngày sinh không được để trống' : '';
            case 'address':
                return value.trim() === '' ? 'Địa chỉ không được để trống' : '';
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
                if (updateStudent(props.infor._id, formData)) {
                    setSuccessMessage('Cập nhật thông tin học viên thành công!');
                    setErrorMessage('')
                    setOpenSnackbar(true);
                }
                else {
                    setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setSuccessMessage('')
                    setOpenSnackbar(true);
                }
            }
            else {
                if (createStudent(formData)) {
                    setSuccessMessage('Thêm thông tin học viên thành công!');
                    setFormData({
                        fullName: '',
                        birthDay: null,
                        phoneNumber: '',
                        address: '',
                    });
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
            console.log('Form contains errors');
        }
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='formInfor'>
            <h3 className='formInfor_title'>THÔNG TIN HỌC VIÊN</h3>
            <form onSubmit={HandleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        label="Tên Học Viên"
                        variant="outlined"
                        margin="normal"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        helperText={errors.fullName}
                        error={!!errors.fullName}
                    />
                </FormControl>
                <FormControl sx={{ width: '48%',marginTop: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày Sinh"
                            name="birthDay"
                            value={formData.birthDay}
                            format='DD/MM/YYYY'
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}

                            helperText={errors.birthDay}
                            error={!!errors.birthDay}
                        />
                    </LocalizationProvider>
                </FormControl >
                <FormControl sx={{ width: '48%', marginLeft: '4%', marginTop: 3 }}>
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
                <FormControl fullWidth  sx={{ marginTop: 3, marginBottom: 3 }}>
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
                {!props.infor ? <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                    Thêm
                </Button> :
                    <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                       Cập nhật thông tin
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

export default FormInforStudent;
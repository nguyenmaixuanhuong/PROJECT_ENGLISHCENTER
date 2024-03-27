import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {  useState,  } from 'react';
import validator from 'validator';
import { addRegister } from '../../services/register.api';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function FormRegister({course}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        yearOld: null,
        address: '',
        course: '',
    });
    React.useEffect(()=>{
        setFormData({ ...formData, course: course?._id });
    },[course])
    const [errors, setErrors] = useState({
        fullName: '',
        phoneNumber: '',
        yearOld: '',
        address: '',
        course: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
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
            case 'yearOld':
                if (value === null) {
                    return 'Vui lòng điền số buổi học'
                }
                else if (value < 0) {
                    return 'Tuổi không được nhỏ hơn 0'
                }
                else if (isNaN(value)) {
                    return 'Giá trị không hợp lệ'
                }
                else return '';
            case 'address':
                return value.trim() === '' ? 'Vui lòng nhập địa chỉ' : '';
            case 'course':
                return value === null ? 'Vui lòng chọn khóa học' : '';
            default:
                return '';
        }
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
            if(addRegister(formData)){
                setSuccessMessage('Đăng kí tư vấn thành công!');
                setOpenSnackbar(true);
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    yearOld: '',
                    address: '',
                    course: '',
                });
            }
            else{
                setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                setSuccessMessage('');
                handleClose();
                setOpenSnackbar(true);
            }
        } 
        else { 
            // Dữ liệu không hợp lệ, hiển thị hoặc xử lý lỗi
            setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
            setSuccessMessage('');
            setOpenSnackbar(true);
        }
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <div>
            <Button variant='contained' sx={{padding: 2}} color='success' onClick={handleOpen}>ĐĂNG KÍ TƯ VẤN KHÓA HỌC</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{backgroundColor: "#001567", color:'white'}}>
                        <h5 className='text-center p-3'> ĐĂNG KÍ TƯ VẤN</h5>
                    </div>
                    <form style={{padding:'30px'}} onSubmit={HandleSubmit}>
                        <FormControl fullWidth >
                        <TextField
                                label="Khóa Học"
                                variant="outlined"
                                margin="normal"
                                name="course"
                                value={course?.courseName}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Tên Học Viên"
                                variant="outlined"
                                margin="normal"
                                name="fullName"
                                value={formData?.fullName}
                                onChange={handleInputChange}
                                helperText={errors.fullName}
                                error={!!errors.fullName}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                margin="normal"
                                name="phoneNumber"
                                value={String(formData.phoneNumber)}
                                onChange={handleInputChange}
                                helperText={errors.phoneNumber}
                                error={!!errors.phoneNumber}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label="Bạn bao nhiêu tuổi"
                                variant="outlined"
                                margin="normal"
                                name="yearOld"
                                value={formData?.yearOld}
                                onChange={handleInputChange}
                                helperText={errors.yearOld}
                                error={!!errors.yearOld}
                            />
                        </FormControl>
                        <FormControl fullWidth  sx={{marginBottom:2}}>
                            <TextField
                                sx={{ margin: '1' }}
                                label="Địa chỉ"
                                variant="outlined"
                                margin="normal"
                                name="address"
                                value={formData?.address}
                                onChange={handleInputChange}
                                helperText={errors.address}
                                error={!!errors.address}
                                multiline
                               
                            />
                        </FormControl>
                        
                        <Button type="submit" variant="contained" color="primary" sx={{ width: '50%', padding: "10px", margin: 'auto', display: 'block' }}>
                            Gửi
                        </Button>
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
                </Box>
            </Modal>
        </div>
    );
}
import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { login } from '../../services/login.api';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import './login.style.scss';
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'username':
                return value.trim() === '' ? 'Username không được để trống' : '';
            case 'password':
                return value.trim() === '' ? 'Mật khẩu không được để trống' : '';
            default:
                return '';
        }
    };


    const HandleSubmitLogin = (event) => {
        event.preventDefault();
        const fieldErrors = {};
        Object.keys(formData).forEach((fieldName) => {
            const error = validateField(fieldName, formData[fieldName]);
            fieldErrors[fieldName] = error;
        });
        setErrors(fieldErrors);
        const hasErrors = Object.values(fieldErrors).some((error) => !!error);
        if (!hasErrors) {
            login(formData).then((response) => {
                sessionStorage.setItem('isLogin', true)
                navigate('/')
            })
                .catch(err => {
                    setOpenSnackbar(true);
                })
        }
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    return (
        <div className='container_form'>
            <form className='form_login' onSubmit={HandleSubmitLogin}>
                <Typography variant='h5' fontWeight={700}>
                    ĐĂNG NHẬP
                </Typography>
                <FormControl fullWidth>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        helperText={errors.username}
                        error={!!errors.username}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        helperText={errors.password}
                        error={!!errors.password}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary"  sx={{ width: '100%', padding: "15px", marginTop: 2, display: 'block',  }}>
                    ĐĂNG NHẬP
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                    'Username hoặc password không chính xác'
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Login;

import { FormControl, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState, useCallback } from 'react';
import Levels from '../../levels/levels';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { addCourse, updateCourse } from '../../../services/course.api';
import ButtonUpload from '../../Button/ButtonUpload'
import { useApp } from '../../../context/AppProvider';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import './FormInfor.style.scss'
function FormInforCourse(props) {
    const { uploadImage } = useApp()
    const [file, setFile] = useState()
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        image: '',
        courseName: '',
        description: '',
        numberSession: '',
        fee: '',
        category: '',
        level: '',
    });
    const [errors, setErrors] = useState({
        courseName: '',
        description: '',
        numberSession: '',
        fee: '',
        category: '',
        level: '',
    });
   
    useEffect(() => {
        setFormData({
            image: props.infor ? props.infor.image : '',
            courseName: props.infor ? props.infor.courseName : '',
            description: props.infor ? props.infor.description : '',
            numberSession: props.infor ? props.infor.numberSession : '',
            fee: props.infor ? props.infor.fee : '',
            category: props.infor ? props.infor.category : '',
            level: props.infor ? props.infor.level : '',
        });
    }, [props.infor]);

    const handleLevelChange = useCallback((selectedLevel) => {
        setFormData({ ...formData, level: selectedLevel });
    }, [formData]);

    
    const handleImageChange = useCallback(async (selectedImage) => {
        setFile(selectedImage)
        const objectURL = URL.createObjectURL(selectedImage);
        setImageURL(objectURL);
        formData.image = null
        setFormData({ ...formData });
    }, [formData]);

    const handleUploadImage = async () => {
        const url_image = await uploadImage(file, 'course')
        formData.image = url_image[0];
        setFormData({ ...formData });
    }
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFormData({ ...formData, category: selectedCategory });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFormData({ ...formData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'courseName':
                return value.trim() === '' ? 'Tên khóa học không được để trống' : '';
            case 'description':
                return value.trim() === '' ? 'Mô tả không được để trống' : '';
            case 'numberSession':
                if (value === null) {
                    return 'Vui lòng điền số buổi học'
                }
                else if (value < 0) {
                    return 'Số buổi học không được nhỏ hơn 0'
                }
                else if (isNaN(value)) {
                    return 'Giá trị không hợp lệ'
                }
                else return '';
            case 'fee':
                if (value === null) {
                    return 'Vui lòng điền giá khóa học'
                }
                else if (isNaN(value)) {
                    return 'Giá trị không hợp lệ'
                }
                else if (value < 0) {
                    return 'Giá trị phải lớn hơn 0'
                }
                else return '';
            case 'category':
                return value.trim() === '' ? 'Vui lòng chọn đối tượng' : '';
            case 'level':
                return value === null ? 'Trình độ không được để trống' : '';
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
            setLoading(true);
            await handleUploadImage();
            if (props.infor) {
                if (updateCourse(props.infor._id, formData)) {
                    setSuccessMessage('Cập nhật thông tin khóa học thành công!');
                    setLoading(false);
                    setOpenSnackbar(true);
                }
                else {

                    setSuccessMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setLoading(false);
                    setOpenSnackbar(true);
                }
            }
            else {
                if (addCourse(formData)) {
                    setSuccessMessage('Thêm thông tin khóa học thành công!');
                    setErrorMessage('')
                    setLoading(false);
                    setOpenSnackbar(true);
                }
                else {

                    setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                    setSuccessMessage('');
                    setLoading(false);
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
            {loading && <CircularProgress className='loading'></CircularProgress>}
            <h3>THÔNG TIN KHÓA HỌC</h3>
            <form onSubmit={HandleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        label="Tên Khóa Học"
                        variant="outlined"
                        margin="normal"
                        name="courseName"
                        value={formData?.courseName}
                        onChange={handleInputChange}
                        helperText={errors.courseName}
                        error={!!errors.courseName}
                    />
                </FormControl>
                <div className="d-flex justify-content-between">
                    <FormControl sx={{ width: '48%', marginTop: '8px' }}>
                        <Levels levelSelected={formData?.level} onChangeLevel={handleLevelChange}
                        ></Levels>
                    </FormControl>
                    <FormControl sx={{ width: '48%', marginTop: '8px' }} >
                        <InputLabel id="demo-simple-select-autowidth-label">Đối tượng</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formData?.category}
                            onChange={handleCategoryChange}
                            autoWidth
                            label='Đối Tượng'
                            helperText={errors.category}
                            error={!!errors.category}
                        >
                            <MenuItem value={'Trẻ em'}>Trẻ em</MenuItem>
                            <MenuItem value={'Thiếu niên'}>Thiếu niên</MenuItem>
                            <MenuItem value={'Người lớn'}>Người lớn</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControl fullWidth>
                    <TextField
                        label="Giá khóa học"
                        variant="outlined"
                        margin="normal"
                        name="fee"
                        value={String(formData.fee)}
                        onChange={handleInputChange}
                        helperText={errors.fee}
                        error={!!errors.fee}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Số buổi học"
                        variant="outlined"
                        margin="normal"
                        name="numberSession"
                        value={String(formData?.numberSession)}
                        onChange={handleInputChange}
                        helperText={errors.numberSession}
                        error={!!errors.numberSession}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Buổi</InputAdornment>,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        sx={{ margin: '1' }}
                        label="Mô tả lộ trình"
                        variant="outlined"
                        margin="normal"
                        name="description"
                        value={formData?.description}
                        onChange={handleInputChange}
                        helperText={errors.description}
                        error={!!errors.description}
                        multiline
                        rows={4}
                    />
                </FormControl>
                <ButtonUpload onChangeImage={handleImageChange}></ButtonUpload>
                {
                    formData.image || imageURL ? <CardMedia
                        sx={{ height: 300, width: '100%', marginY: 2, objectFit: 'contain '  }}
                        image={formData.image || imageURL}
                        title="green iguana"
                    />
                        : null
                }
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

export default FormInforCourse;
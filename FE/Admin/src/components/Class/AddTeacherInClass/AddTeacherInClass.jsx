import * as React from 'react';
import Box from '@mui/material/Box';
import {Button,Snackbar} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import SearchSelect from '../SearchSelect'
import { useCallback,useState } from 'react';
import { addTeachersInClass } from '../../../services/class.api';
import MuiAlert from '@mui/material/Alert';
import { useApp } from '../../../context/AppProvider';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function AddTeacherInClass(props) {
    const { teachers, loadTeachers } = useApp();
    React.useEffect(() => {
        // Load dữ liệu học viên khi component được mount
        loadTeachers();
    }, []);

    const data = teachers.map((teacher) => {
        return { value: teacher._id, label: `${teacher.account.username}: ${teacher.fullName}` };
    })
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error,setError] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };
    const [TeacherClass,setTeacherClass]= useState([])
    const handleChangeTeacher = useCallback((Teacher) => {
        setTeacherClass(Teacher);
    }, []);
    const addTeacherInClass = async ()=>{
        const idclass = props.idclass
        if(addTeachersInClass(idclass,TeacherClass)){
            setError(false);
            setOpenSnackbar(true)
            handleClose()
        }
        else{
            setError(true);
            setOpenSnackbar(true)
        }
        
    }
    return (
        <div>
            <Tooltip title='Thêm giáo viên'>
                <Button  onClick={handleOpen}>
                <IconButton>
                    <PersonAddAlt1Icon color='primary' sx={{ alignItems: 'start', fontSize: 28 }}></PersonAddAlt1Icon>
                </IconButton>
                    Thêm giáo viên
                </Button>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component="div" variant="h6" sx={{ textAlign: 'center', color: 'white', fontWeight: 700, backgroundColor: '#001567', padding: 2 }}>
                        THÊM GIÁO VIÊN VÀO LỚP
                    </Typography>
                    <div className='p-4'>
                        <SearchSelect onChangeSelect={handleChangeTeacher} isTeacher={true} data={data}></SearchSelect>
                        <Button onClick={addTeacherInClass} variant='contained' fullWidth sx={{padding: 1}}>Thêm vào lớp</Button>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                    open={openSnackbar}
                    autoHideDuration={1000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    {error ?
                        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="error">
                            'Đã có lỗi, vui lòng thử lại'
                        </MuiAlert> :
                        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                           'Thêm giáo viên vào lớp thành công'
                        </MuiAlert>
                    }
                </Snackbar>
        </div>
    );
}
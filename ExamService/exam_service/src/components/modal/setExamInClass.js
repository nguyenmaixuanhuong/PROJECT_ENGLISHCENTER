import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { setSummary } from '@/store/examSlice';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function setExamInClass({ classes, status }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [classList, setClassList] = React.useState(classes);
    const [classesSelected, setClassesSelected] = React.useState([]);
    const exam = useSelector(state => state.exam);
    const dispatch = useDispatch();
    const handleSelectClass = (cls, isSelected) => {
        let scope = {
            isPublic: false,
            classes: []
        }
        if (isSelected) {
            setClassList(classList.filter((item) => item._id !== cls._id))
            setClassesSelected([...classesSelected, cls])
            scope.classes = [...classesSelected, cls];
        }
        else {
            setClassesSelected(classesSelected.filter((item) => item._id !== cls._id))
            setClassList([...classList, cls])
            scope.classes = classesSelected.filter((item) => item._id !== cls._id)
        }

        const summary = exam.summary;
        const update = { ...summary, scope: scope }
        dispatch(setSummary(update));

    }
    return (
        <Box >
            <Button
                disabled={status === 'now' || status === 'end' ? true : false}
                variant='outlined'
                onClick={handleOpen}>
                + Thêm lớp được tham gia
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <IconButton onClick={handleClose} sx={{ float: 'right' }}>
                            <CloseIcon ></CloseIcon>
                        </IconButton>
                        <Typography sx={{ textAlign: "center", mb: 3 }} id="modal-modal-title" variant="h5" component="h2">
                            Thành Viên Làm Bài
                        </Typography>
                    </Box>
                    <Grid sx={{ minHeight: 400 }} container >
                        <Grid item xs={6} sx={{ p: 3, border: '2px solid #f6f7fa' }}>
                            <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="body1" component="h2">
                                Danh Sách Lớp
                            </Typography>
                            <Divider sx={{ backgroundColor: "rgb(16, 16, 89)" }}></Divider>
                            <Box>
                                {classList.map(item => (
                                    <Button
                                        key={item._id}
                                        onClick={() => { handleSelectClass(item, true) }}
                                        fullWidth sx={{ mt: 2 }}
                                        variant='outlined'>+ {item.className}</Button>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{ backgroundColor: '#f6f7fa', p: 3 }}>
                            <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="body1" component="h2">
                                Lớp Đã Chọn
                            </Typography>
                            <Divider sx={{ backgroundColor: "rgb(16, 16, 89)" }}></Divider>
                            <Box>
                                {classesSelected.length != 0 ? classesSelected.map(item => (
                                    <Button
                                        key={item._id}
                                        onClick={() => { handleSelectClass(item, false) }}
                                        fullWidth sx={{ mt: 2 }}
                                        variant='outlined'>+ {item.className}
                                    </Button>
                                ))
                                    :
                                    <Typography sx={{ textAlign: 'center', mt: 3, color: 'gray' }} >Chưa có lớp nào được chọn</Typography>

                                }
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}

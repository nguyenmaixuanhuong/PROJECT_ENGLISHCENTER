import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import SearchStudent from './SearchStudent'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AddStudentInClass() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Tooltip title='Thêm học sinh'>
                <IconButton onClick={handleOpen}>
                    <PersonAddAlt1Icon color='action' sx={{ alignItems: 'start', fontSize: 28 }}></PersonAddAlt1Icon>
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SearchStudent></SearchStudent>
                </Box>
            </Modal>
        </div>
    );
}
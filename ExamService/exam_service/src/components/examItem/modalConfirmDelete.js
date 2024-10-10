import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalConfirmDelete({ openModal, deleteExam }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setOpen(openModal)
    }, [openModal])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign={'center'} id="modal-modal-title" variant="body1" component="h2">
                        Bạn có chắc là muốn xóa bài kiểm tra này không?
                    </Typography>
                    <Box sx={{ mt: 3, float: 'right' }}>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            handleClose()
                        }} variant='outlined' sx={{ mr: 2 }}>Cancel</Button>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            deleteExam();
                        }} variant='contained'>Có</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

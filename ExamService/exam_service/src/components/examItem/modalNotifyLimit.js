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
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalNotifyLimit() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button fullWidth variant='contained' color='warning' size='small' onClick={handleOpen}> Vào Thi </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign={'center'} color={'red'} id="modal-modal-title" variant="body2" component="h2">
                        Đã quá giới hạn làm bài, bạn không thể thực hiện bài kiểm tra này nữa
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

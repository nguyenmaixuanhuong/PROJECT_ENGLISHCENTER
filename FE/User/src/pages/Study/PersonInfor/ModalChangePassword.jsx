import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { changePassword } from '../../../services/auth.api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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

export default function ChangePassword({ user }) {
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenSnackbar = () => setOpenSnackbar(true);
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const [prePassword, setPrePassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const handleChangePrePassword = (e) => {
        const prePassword = e.target.value
        setPrePassword(prePassword);
    }
    const handleChangeNewPassword = (e) => {
        const newPassword = e.target.value
        setNewPassword(newPassword);
    }

    const handleSubmitPassword = async () => {
        const result = await changePassword(user.account?._id, prePassword, newPassword)
        if (result === 200) {
            setSuccess(true)
            handleOpenSnackbar();
            handleClose();
        }
        else {
            setSuccess(false)
            handleOpenSnackbar();
            handleClose();
        }
    }
    return (
        <div>
            <Button sx={{ml:4}} onClick={handleOpen}>Đổi mật khẩu</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='change-password'>
                    <Typography id="modal-modal-title" color={'red'} textAlign={'center'} variant="h6" component="h2">
                        Bạn muốn thay đổi mật khẩu ?
                    </Typography>
                    <TextField
                        value={prePassword}
                        className='input-password'
                        id="1"
                        label="Nhập lại mật khẩu cũ"
                        variant="filled"
                        onChange={handleChangePrePassword}
                        type='password'
                    />
                    <TextField
                        value={newPassword}
                        className='input-password'
                        id="2"
                        label="Nhập mật khẩu mới"
                        variant="filled"
                        onChange={handleChangeNewPassword}
                        type='password'
                    />
                    <div className="submit text-end mt-3">
                        <Button color='warning' sx={{ mr: 2 }} onClick={handleClose}>Hủy</Button>
                        <Button variant='contained' onClick={handleSubmitPassword}>Đổi mật khẩu</Button>
                    </div>
                </Box>
            </Modal>
            {success ?
                <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Bạn đã đổi mật khẩu thành công
                    </Alert>
                </Snackbar>
                :
                <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Mật khẩu không chính xác, vui lòng thử lại
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}
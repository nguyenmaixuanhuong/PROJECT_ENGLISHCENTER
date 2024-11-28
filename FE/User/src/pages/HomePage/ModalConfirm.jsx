import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalConfirm() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Bài kiểm tra năng lực Tiếng Anh ',
                    text: 'Tham gia bài kiểm tra này nhé!',
                    url: "http://localhost:8000/test?id=67028de7f8c5057f1885c4c0",
                });
                console.log('Chia sẻ thành công!');
            } catch (error) {
                console.error('Chia sẻ thất bại:', error);
            }
        } else {
            alert('Chức năng chia sẻ không được hỗ trợ trên trình duyệt này.');
        }
    }
    return (
        <div>
            <Button onClick={handleOpen} variant="contained" className='nav-item_btn study-system' color='error'>Tham gia bài kiểm tra năng lực</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ textAlign: 'center' }}>
                        <IconButton onClick={handleClose} sx={{ float: 'right' }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography id="modal-modal-title" mb={3} variant="h6" component="h2">
                            BÀI KIỂM TRA NĂNG LỰC TIẾNG ANH
                        </Typography>

                        <Typography color={'GrayText'} my={2} id="modal-modal-description" variant="body1">
                            Bài kiểm tra gồm 4 phần: <strong>Grammar</strong>, <strong>Writing</strong>, <strong>Listening</strong>, <strong>Speaking</strong>, <strong>Reading</strong>
                        </Typography>
                        <Typography color={'GrayText'} my={2} id="modal-modal-description" variant="body1">
                            Thời gian làm bài: 60 phút
                        </Typography>
                        <Typography sx={{ fontStyle: 'italic' }} color={'GrayText'} my={2} id="modal-modal-description" variant="body2">
                            <strong color='red'>Lưu ý:</strong>  Vui lòng chuẩn bị tai nghe, wifi.. để có thể làm bài tốt nhất
                        </Typography>
                        <Typography sx={{ fontStyle: 'italic' }} color={'GrayText'} my={2} id="modal-modal-description" variant="body2">
                            Khi hoàn thành xong bạn sẽ có kết quả ngay lập tức. Chần chờ gì nữa hãy..
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        <Button target='_blank' href="http://localhost:8000/test?id=67028de7f8c5057f1885c4c0" variant="contained" className='nav-item_btn study-system' color='error'>VÀO THI</Button>

                        <Button onClick={handleShare} variant='contained' color='success' >Chia sẻ <ShareIcon sx={{ ml: 1 }} /></Button>
                    </Box>

                </Box>

            </Modal>
        </div >
    );
}

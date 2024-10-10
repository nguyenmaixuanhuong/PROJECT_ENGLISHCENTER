import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Icon, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CheckSharp } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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

export default function ModalConfirm({ type, exam, handleSubmit, loading }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userId = Cookies.get('userId');
    const guestId = localStorage.getItem('guestId');
    const [loadingModal, setLoading] = React.useState();

    React.useEffect(() => {
        setLoading(loading)
    }, [loading])

    const handleExit = async () => {
        if (userId !== "null") {
            router.push('/exams')
        }
        localStorage.setItem('timeLeft', null)
        localStorage.setItem('timestamp', null)
        const res = await fetch(`/api/deleteAnswer`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId !== 'null' ? userId : guestId, examId: exam.id })
        });
        if (res.status === 200) {
            if (userId !== 'null') {
                router.push('/exams');
            }
            router.push('/');
        }
        else {
            toast.error('Đã có lỗi xảy ra')
        }
    }


    return (
        <div>
            {type === 'end' ?
                <Button onClick={handleOpen} variant='contained' color='warning'>Nộp Bài</Button>
                :
                <IconButton onClick={handleOpen}>
                    <CloseIcon fontSize='large' sx={{ color: 'grey' }}></CloseIcon>
                </IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loadingModal ? <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <CircularProgress ></CircularProgress>
                        <Typography textAlign={'center'} mt={2} id="modal-modal-title" variant="body2" component="h2">
                            Hệ thống đang xử lý kết quả. Vui lòng đợi trong vài phút...
                        </Typography>
                    </Box>
                        : <>
                            <IconButton onClick={handleClose} sx={{ float: 'right', color: 'gray' }}>
                                <CloseIcon ></CloseIcon>
                            </IconButton>
                            <Typography textAlign={'center'} id="modal-modal-title" variant="h5" component="h2">
                                {exam.summary.title}
                            </Typography>

                            {type === 'exit' ?
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                                        <CheckSharp color='primary' sx={{ mr: 2 }}></CheckSharp>
                                        <Typography color={'GrayText'} id="modal-modal-description" >
                                            Sau khi xác nhận thoát, bài làm hiện tại của bạn sẽ bị hủy. Bạn có chắc là muốn thoát không ?
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckSharp color='primary' sx={{ mr: 2 }} ></CheckSharp>
                                        <Typography color={'GrayText'} id="modal-modal-description" >
                                            Bạn có thể tiếp tục làm bài trắc nghiệm này trong thời gian hiệu lực
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={handleExit} sx={{ mt: 4, width: '50%' }} variant='contained' color='warning'>Xác nhận </Button>
                                    </Box>
                                </>
                                : <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                                        <CheckSharp color='primary' sx={{ mr: 2 }}></CheckSharp>
                                        <Typography color={'GrayText'} id="modal-modal-description" >
                                            Sau khi xác nhận, bài làm của bạn sẽ được lưu vào hệ thống.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckSharp color='primary' sx={{ mr: 2 }} ></CheckSharp>
                                        <Typography color={'GrayText'} id="modal-modal-description" >
                                            Bạn không thể thực hiện lại bài kiểm tra này nữa.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {userId !== 'null' ?
                                            <Button onClick={() => {
                                                handleSubmit()
                                                setLoading(true)
                                            }} sx={{ mt: 4, width: '50%' }} variant='contained' color='warning'>Xác nhận </Button>
                                            :
                                            <Button onClick={() => {
                                                handleSubmit()
                                                setLoading(true)

                                            }} sx={{ mt: 4, width: '50%' }} variant='contained' color='warning'>Xác nhận </Button>

                                        }
                                    </Box>
                                </>
                            }
                        </>
                    }
                </Box>

            </Modal>
        </div>
    );
}

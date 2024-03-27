import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Tooltip from '@mui/material/Tooltip';
import { getStudent } from '../../../services/student.api'
import useAuthCheck from '../../../context/useAuthCheck';
import { useApp } from '../../../context/AppProvider';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    p: 4,
};

export default function DetailInforStudent(props) {
    useAuthCheck();
    const {formatDate} = useApp();
    const [inforstudent, setInForStudent] = useState();
    useEffect(() => {
        async function fetchData() {
            const data = await getStudent(props.id);
            setInForStudent(data)
        }
        fetchData();
    }, [props.id]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {inforstudent && <div>
                <Button onClick={handleOpen} >
                    <Tooltip title="Thông tin chi tiết">
                        <AssignmentIndIcon />
                    </Tooltip>
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                    <Typography style={{ textAlign: 'center', fontWeight:700 }} id="modal-modal-title" variant="h5" component="h2">
                            TRUNG TÂM ANH NGỮ OCEANENGLISH
                        </Typography>
                        <Typography style={{ textAlign: 'center' ,marginTop: '10px',fontWeight:700}} id="modal-modal-title" variant="h6" component="h2">
                            THÔNG TIN HỌC VIÊN
                        </Typography>
                        <div className='infor-body d-flex' style={{ justifyContent: 'space-around' }}>
                            <div className="infor-person">
                                <Typography id="modal-modal-description" sx={{ mt: 4, fontWeight: 700 }}>
                                    - Thông tin cá nhân:
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                    Họ và tên: {inforstudent.fullName}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                    Ngày sinh: {formatDate(inforstudent.birthDay)}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                    Số điện thoại: {inforstudent.phoneNumber}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                    Địa chỉ: {inforstudent.address}
                                </Typography>
                            </div>
                            <div>
                                <div className="infor-account">
                                    <Typography id="modal-modal-description" sx={{ mt: 4, fontWeight: 700 }}>
                                        - Tài Khoản:
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                        Mã Học Viên: {inforstudent.account.username}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
                                        Password: {inforstudent.phoneNumber}
                                    </Typography>
                                </div>
                                <div className="infor-class ">
                                    <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 700 }}>
                                        - Là học viên của lớp:
                                    </Typography>
                                    {inforstudent.class.map((current) => (
                                        !current.isFinish ? <Typography id="modal-modal-description" sx={{ mt: 1, ml: 2 }}>
                                            {current.className}
                                        </Typography> : ''
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div> }
        </div>

    );
}

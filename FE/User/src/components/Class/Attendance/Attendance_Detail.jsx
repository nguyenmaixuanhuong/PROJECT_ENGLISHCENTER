import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

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

const columns = [
    { field: 'username', headerName: 'Mã học viên', width: 180 },
    { field: 'fullName', headerName: 'Họ và tên ', width: 200 },
    { field: 'attend', headerName: 'Điểm danh', width: 100 },
];

export default function Attendance_Detail({ students, attendance, index }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [attendees, setAttendees] = React.useState([]);
    React.useEffect(() => {
        if (students) {
            const rows = students.map((student) => {
                if (attendance.attendees.includes(student._id)) {
                    return { "id": student._id, "username": student.account.username, "fullName": student.fullName, "attend": 'Có mặt', 'className': 'attend' }
                }
                else {
                    return { "id": student._id, "username": student.account.username, "fullName": student.fullName, "attend": 'Vắng', 'className': 'absent' }
                }
            })
            setAttendees(rows);
        }
    }, [students])
    const getRowClassName = (params) => {
        return params.row.className || '';
    };
    return (
        <div>
            <div onClick={handleOpen} className="attendance">
                <h5>Buổi {index + 1}</h5>
                <h6>Ngày: {new Date(attendance.date).toLocaleDateString('vi-VN')}</h6>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h4" component="h2">
                        BẢNG ĐIỂM DANH BUỔI {index + 1}
                    </Typography>
                    <Typography id="modal-modal-title" sx={{ textAlign: 'center', fontSize: 18 }} variant="body1" component="h2">
                        Ngày: {new Date(attendance.date).toLocaleDateString('en-GB')}
                    </Typography>
                    <Typography id="modal-modal-title" sx={{ textAlign: 'center', fontSize: 18 }} variant="body1" component="h2">
                        Giáo viên: {attendance.teacher.fullName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid sx={{ textAlign: 'center', fontSize: 18 }}
                                rows={attendees}
                                columns={columns}
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                getRowClassName={getRowClassName}
                            />
                        </div>
                    </Typography>
                    <Button color='warning' variant='contained' onClick={handleClose} sx={{ float: 'right', mt: 1 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
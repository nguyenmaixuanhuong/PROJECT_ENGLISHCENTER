import './Attendance.style.scss'
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";
import { createAttendance, listAttendance } from '../../../services/attendance'
import AttendanceDetail from './Attendance_Detail';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}
const columns = [
    { field: 'username', headerName: 'Mã học viên', width: 180 },
    { field: 'fullName', headerName: 'Họ và tên ', width: 200 },

];

function Attendance({ classCurrent }) {
    const user = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [attendances, setAttendances] = React.useState([]);
    const [success, setSuccess] = React.useState(false);

    useEffect(() => {
        async function fetchAttendance() {
            const attendances = await listAttendance(classCurrent._id);
            setAttendances(attendances)
        }
        fetchAttendance();
    }, [classCurrent?._id])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };
    const updatedColumns = [...columns];
    updatedColumns.push({
        field: 'id',
        headerName: 'Điểm danh',
        width: 100,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <input type="checkbox" style={{ marginLeft: '20px', width: '20px', height: '20px' }}
                checked={selectedRows.includes(params.row.id)}
                onChange={(event) => handleCheckboxChange(event, params.row.id)}
                readOnly 
            />
        ),
    });
    const students = classCurrent.students.map((student) => {
        return { "id": student._id, "username": student.account.username, "fullName": student.fullName }
    })


    const handleCheckboxChange = (event, rowId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
        } else {
            setSelectedRows((prevSelectedRows) =>
                prevSelectedRows.filter((id) => id !== rowId)
            );
        }
    };

    console.log(selectedRows);
    const saveAttdance = () => {
        const attendance = {
            class: classCurrent._id,
            teacher: user.user._id,
            attendees: selectedRows
        }
        if (createAttendance(attendance)) {
            setSuccess(true);
            handleClose();
            setSelectedRows([])
        }
        else {
            setSuccess(false);
        }

    }

    return (
        <div className="attendance">
            <div className="title-attendance">
                <h3>ĐIỂM DANH</h3>
                {user.role === 'Teacher' ?
                    <Button onClick={handleOpen} color='success' variant='contained' sx={{ marginBottom: 2 }}> <BookmarksIcon /> ĐIỂM DANH</Button>
                    : ''
                }
            </div>
            <div className="modal-attendance">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" sx={{ textAlign: 'center' }} variant="h4" component="h2">
                            BẢNG ĐIỂM DANH
                        </Typography>         
                        <Typography id="modal-modal-title" sx={{ textAlign: 'center' }} variant="h6" component="h2">
                          Ngày:   {new Date().toLocaleDateString('vi-VN')}
                        </Typography> 
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid sx={{ textAlign: 'center', fontSize: 18 }}
                                    rows={students}
                                    columns={updatedColumns}
                                    hideFooterPagination
                                    selectionModel={selectedRows}
                                    hideFooterSelectedRowCount
                                />
                            </div>
                            <Button onClick={saveAttdance} sx={{ float: 'right', mt: 1 }}>
                                <SaveIcon fontSize='large'></SaveIcon>
                                <h6 className='mt-3'>Lưu</h6>
                            </Button>
                            <Button color='warning'  onClick={handleClose} sx={{ float: 'right', mt: 1 }}>
                                <h6 className='mt-3'>Hủy</h6>
                            </Button>
                            
                        </Typography>
                    </Box>
                </Modal>
                <div>
                    <Snackbar open={success} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Đã lưu thành công
                        </Alert>
                    </Snackbar>
                </div>
            </div>

            <div className="list-attendance">
                {attendances && attendances.map((attendance, index) => (
                    <AttendanceDetail students={classCurrent.students} attendance={attendance} index={index}></AttendanceDetail>
                ))}
            </div>
        </div>
    );
}

export default Attendance;
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import './listStudent.style.scss'
import { Link } from 'react-router-dom';
import DetailInforStudent from '../ModalDetailInfor/detailInforStudent';
import { useApp } from '../../../context/AppProvider';
function Row(props) {
    const { row } = props;
    const { formatDate } = useApp()
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.account.username}
                </TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{formatDate(row.birthDay)}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">
                    <Tooltip title="Thông tin Chi tiết">
                        <DetailInforStudent id={row._id} />
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Link to={`/updatestudent/${row._id}`}>
                        <Tooltip title="Cập nhật">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" sx={{fontWeight: 700}} gutterBottom component="div">
                                Thông tin lớp học
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: 700}} align='center'>STT</TableCell>
                                        <TableCell sx={{fontWeight: 700}} align='center'>Tên Lớp</TableCell>
                                        <TableCell sx={{fontWeight: 700}} align="center">Thời gian bắt đầu</TableCell>
                                        <TableCell sx={{fontWeight: 700}} align="center">Thời gian kết thúc</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.class.map((historyRow,index) => (
                                        <TableRow key={historyRow.className} >
                                              <TableCell align='center'>
                                                {index+1}
                                            </TableCell>
                                            <TableCell align='center' component="th" scope="row">
                                                {historyRow.className}
                                            </TableCell>
                                            <TableCell align="center">{formatDate(historyRow.startDay)}</TableCell>
                                            <TableCell align="center">
                                                {formatDate(historyRow.finishDay)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default function ListStudent(props) {
    return (
        <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
            <Table aria-label="collapsible table" stickyHeader>
                <TableHead >
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{fontWeight: 700}}>Mã Học Viên</TableCell>
                        <TableCell sx={{fontWeight: 700}} align="center">Tên Học Viên</TableCell>
                        <TableCell sx={{fontWeight: 700}} align="center">Ngày Sinh</TableCell>
                        <TableCell sx={{fontWeight: 700}} align="center">Số Điện Thoại</TableCell>
                        <TableCell sx={{fontWeight: 700}} align="center">Địa Chỉ</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.students && props.students.map((row) => (
                        <Row key={row._id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
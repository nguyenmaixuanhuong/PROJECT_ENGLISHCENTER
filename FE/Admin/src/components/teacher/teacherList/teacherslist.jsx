import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import './teacherslist.style.scss'
import { Link } from 'react-router-dom';
import {useApp} from '../../../context/AppProvider'
function Row(props) {
    const { row } = props;
    const {formatDate} = useApp()
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell  align="center">
                    {row.account.username}
                </TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{formatDate(row.birthDay)}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.level?.name}</TableCell>
                <TableCell align="center"><Link to={`/updateteacher/${row._id}`}>
                    <Tooltip title="Cập nhật">
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Link></TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default function ListStudent(props) {
    return (
        <TableContainer component={Paper}  style={{maxHeight: '500px'}}>
            <Table aria-label="collapsible table" stickyHeader>
                <TableHead >
                    <TableRow >
                        <TableCell>Mã Giáo Viên</TableCell>
                        <TableCell align="center">Tên Giáo Viên</TableCell>
                        <TableCell align="center">Ngày Sinh</TableCell>
                        <TableCell align="center">Số Điện Thoại</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Level</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.teachers && props.teachers.map((row) => (
                        <Row key={row._id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
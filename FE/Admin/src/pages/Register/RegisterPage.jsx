import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllRegister, confirmContact } from '../../services/register.api';
import { Button } from '@mui/material';
export default function RegisterPage() {
    const [listRegister, setListRegister] = React.useState([]);

    async function fetchData() {
        const listRegister = await getAllRegister();
        setListRegister(listRegister);
    }

    const confirmContacted = async (id) => {
        const contacted = await confirmContact(id);
        if (contacted) {
           fetchData();

        }
        else {
            alert('Đã có lỗi xảy ra')
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-5">
            <h2 className='text-center mb-2'>Đăng Kí Tư Vấn Khóa Học</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="center">Họ và tên</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Độ tuổi</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Số điện thoại</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Địa chỉ </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center">Khóa Học Quan Tâm </TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRegister && listRegister.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" align="center" scope="row">
                                    {row.fullName}
                                </TableCell>
                                <TableCell align="center">{row.yearOld}</TableCell>
                                <TableCell align="center">{row.phoneNumber}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center">{row.course.courseName} ({row.course.category})</TableCell>
                                {
                                    row.isContacted ?
                                        <TableCell align="center">Đã liên hệ</TableCell>
                                        :
                                        <TableCell align="center"><Button onClick={()=>{confirmContacted(row._id)}} variant='contained' color='success'>Liên hệ</Button></TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
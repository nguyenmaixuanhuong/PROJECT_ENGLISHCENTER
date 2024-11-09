import { Box, Button, Container, Typography } from "@mui/material";
import { resultExam } from "../api/resultExam";
import cookie from 'cookie';
import ResultQuestion from "@/components/resultItem/resultQuestion";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalResultDetail from "@/components/resultItem/modalResultDetail";
export async function getServerSideProps(context) {
    const { examId } = context.query;
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const userId = cookies.userId;
    const resultData = await resultExam(userId, examId)
    return {
        props: { resultData },
    };
}

const ResultExam = ({ resultData }) => {
    const router = useRouter();
    if (!resultData) {
        router.push('/error/error500')
    }
    if (resultData.status === 200) {
        const attempts = resultData.result
        const examSummary = attempts[0].examSummary
        console.log(attempts);

        return (
            <div style={{ marginTop: '100px' }}>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/exams"
                        >
                            Bài kiểm tra
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Kết quả</Typography>
                    </Breadcrumbs>
                </div>
                <Typography textAlign={'center'} my={3} sx={{ backgroundColor: '#0a005a', color: 'white', p: 2, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, mb: 4 }}>
                    <Typography variant="body1" color={'orangered'}> Bài kiểm tra: {examSummary.title}</Typography>
                    <Typography variant="body1" color={'orangered'}> Thời gian: {examSummary.times}</Typography>
                </Box>

                <TableContainer sx={{ my: 3 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: 'lightgrey', }}>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Lần</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Thời gian nộp bài</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Điểm</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attempts.map((item) => (
                                <TableRow

                                    key={item.attempt}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.attempt}
                                    </TableCell>
                                    <TableCell align="center">{new Date(item.submitTime).toLocaleString()}</TableCell>
                                    <TableCell align="center">{item.finalScore}</TableCell>
                                    <TableCell align="center">
                                        {
                                            item.isPublicScore ? <ModalResultDetail resultData={item} />
                                                : <Typography variant='body1' color='blue'>Chờ chấm điểm</Typography>
                                        }
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
    else {
        return <div style={{ marginTop: '100px' }}>
            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/exams"
                    >
                        Bài kiểm tra
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Kết quả</Typography>
                </Breadcrumbs>
            </div>
            <Typography textAlign={'center'} my={3} sx={{ backgroundColor: '#0a005a', color: 'white', p: 2, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, }}>
                <Typography variant="body1"> Bài kiểm tra: {resultData?.result.summary.title}</Typography>
                <Typography variant="body1"> Thời gian: {resultData?.result.summary.times}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fbfbfb', py: 5 }}>
                <Typography variant='body2' fontWeight={'bold'} color={"rebeccapurple"} >
                    Chưa có kết quả nào được lưu lại
                </Typography>

            </Box>
        </div>
    }


}


export default ResultExam;
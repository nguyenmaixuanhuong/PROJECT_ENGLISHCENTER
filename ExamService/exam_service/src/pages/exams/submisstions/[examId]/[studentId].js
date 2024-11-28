import { resultExam } from '@/pages/api/resultExam';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import ResultQuestion from '@/components/resultItem/resultQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalResultDetail from "@/components/resultItem/modalResultDetail";
import { deleteScoreAnswer } from '@/store/answerScoreSlice';

export async function getServerSideProps(context) {
    const { examId } = context.params;
    const userId = context.params.studentId;
    const resultData = await resultExam(userId, examId)
    return {
        props: {
            examId,
            resultData,
            userId
        },
    };
}
const SubmissionPage = ({ resultData, examId, userId }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const updatedAnswers = useSelector(state => state.answers.updatedAnswers);
    const status = useSelector(state => state.exam.status);
    if (!resultData) {
        router.push('/error/error500')
    }
    if (resultData.status === 200) {
        const attempts = resultData.result
        const examSummary = attempts[0].examSummary

        const saveFinalScore = async () => {
            const res = await fetch('/api/updateFinalScore', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answersUpdate: updatedAnswers })
            });

            if (res.status == 200) {
                toast.success('Score updated successfully')
                dispatch(deleteScoreAnswer())
                router.push(`/exams/submisstions/${examId}/${userId}`)
            }
            else {
                router.push('/error/error500')
            }
        }

        return (
            <div style={{ marginTop: '100px' }}>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/exams">
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href={`/exams/submisstions?examId=${examId}&&status=${status}`}
                        >
                            Danh sách bài nộp
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Kết quả</Typography>
                    </Breadcrumbs>
                </div>
                <Typography textAlign={'center'} my={3} sx={{ backgroundColor: '#0a005a', color: 'white', p: 2, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, mb: 4 }}>
                    <Typography variant="body1" color={'#2974ce'}> Bài kiểm tra: {examSummary.title}</Typography>
                    <Typography variant="body1" color={'#2974ce'}> Thời gian: {examSummary.times}</Typography>
                    <Typography variant="body1" color={'#2974ce'}> Học Viên: {attempts[0].user.fullName}</Typography>
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
                            {attempts.map((item, index) => (
                                <TableRow

                                    key={item.attempt}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.attempt ?? index + 1}
                                    </TableCell>
                                    <TableCell align="center">{new Date(item.submitTime).toLocaleString()}</TableCell>
                                    <TableCell align="center">{item.finalScore}</TableCell>
                                    <TableCell align="center">

                                        <ModalResultDetail resultData={item} saveFinalScore={saveFinalScore} />
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
};


export default SubmissionPage;

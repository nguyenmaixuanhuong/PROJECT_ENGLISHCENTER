import ExamLayout from "@/components/layouts/ExamLayout";
import styles from '../exam.module.scss'
import { getResults } from "../../api/getResults";
import { Box, Button, Container, Typography } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from "next/navigation";
import { TurnOnPublishScore } from "@/pages/api/turnOnPublishScore";
import Chip from '@mui/material/Chip';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export async function getServerSideProps(context) {
    const { examId, status } = context.query;
    const resultsData = await getResults(examId)
    return {
        props: { examId, resultsData, status },
    };
}
const Submissions = ({ examId, resultsData, status }) => {
    const autoGrade = useSelector((state) => state.exam.summary.autoGrade) || false;
    const handlePublishScore = async () => {
        const result = await TurnOnPublishScore(examId);
        if (result) {
            toast.success("Điểm đã được công khai")
        }
        else {
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
        }
    }
    const router = useRouter();
    return (
        <div className={styles.exams_container}>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650, maxHeight: 500 }} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tên học viên</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Lớp</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Thời gian nộp bài</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Chấm điểm</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resultsData && resultsData.map((result) => (
                            <TableRow
                                onClick={() => { router.push(`/exams/submisstions/${examId}/${result._id}`) }}
                                hover
                                key={result._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {result.studentName}
                                </TableCell>
                                <TableCell align="center">{result.className}</TableCell>
                                <TableCell align="center">{new Date(result.submittedAt).toLocaleString()}</TableCell>
                                <TableCell align="center">{result.isGraded ? <Chip label="Đã chấm" color="success" /> : <Chip label="Chưa hoàn thành" color="warning" />}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {status !== 'end' && !autoGrade &&
                    <Button onClick={handlePublishScore} variant="contained" >Công Khai Điểm</Button>
                }
            </Box>
        </div>
    )
}

Submissions.getLayout = function getLayout(page) {
    return <ExamLayout><Container>{page}</Container></ExamLayout>;
};

export default Submissions;
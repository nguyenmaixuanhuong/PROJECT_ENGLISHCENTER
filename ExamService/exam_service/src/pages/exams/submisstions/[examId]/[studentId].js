import { resultExam } from '@/pages/api/resultExam';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import ResultQuestion from '@/components/resultItem/resultQuestion';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
const SubmissionPage = ({ resultData, examId }) => {
    const router = useRouter()
    const updatedAnswers = useSelector(state => state.answers.updatedAnswers);
    const status = useSelector(state => state.exam.status);
    if (!resultData) {
        router.push('/error/error500')
    }

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
            router.push(`/exams/submisstions?examId=${examId}&&status=${status}`)
        }
        else {
            router.push('/error/error500')
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href={`/exams/create-exam?status=${status}`}>
                    Bài kiểm tra
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/exams/submisstions?examId=${examId}&&status=${status}`}
                >
                    Các bài nộp
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Kết quả</Typography>
            </Breadcrumbs>
            <Typography textAlign={'center'} my={3} sx={{ backgroundColor: '#0a005a', color: 'white', p: 2, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, }}>
                <Typography variant="body1"> Bài kiểm tra: {resultData?.examSummary.title}</Typography>
                <Typography variant="body1"> Thời gian: {resultData?.examSummary.times}</Typography>
            </Box>

            {resultData && resultData.parts.map((part) => (
                <Box sx={{ mt: 3 }} key={part.partId}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fbfbfb', p: 2 }}>
                        <Typography variant='h6' >
                            Phần {part.partNumber}: {part.partTitle}
                        </Typography>
                        <Typography variant='body1'>Điểm: /{part.partScore}</Typography>
                    </Box>
                    <ul>
                        {part.questions.sort((a, b) => a.question.number - b.question.number)
                            .map((item, itemIndex) => {
                                return (
                                    <ResultQuestion
                                        key={itemIndex}  // Đảm bảo mỗi câu hỏi có key riêng
                                        type={part.partType === 'Custom' ? item.question.questionType : part.partType}
                                        result={item}
                                    />
                                );
                            })}
                    </ul>
                </Box>
            ))

            }

            <Button onClick={saveFinalScore} sx={{ mb: 3, float: 'right', p: 2 }} variant='contained'>Lưu Điểm</Button>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { examId } = context.params;
    const userId = context.params.studentId;
    const resultData = await resultExam(userId, examId)
    return {
        props: {
            examId,
            resultData
        },
    };
}

export default SubmissionPage;

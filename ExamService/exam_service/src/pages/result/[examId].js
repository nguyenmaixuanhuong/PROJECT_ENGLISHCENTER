import { Box, Container, Typography } from "@mui/material";
import { resultExam } from "../api/resultExam";
import cookie from 'cookie';
import ResultQuestion from "@/components/resultItem/resultQuestion";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";

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
    const scoreExam = resultData.parts.reduce((acc, item) => acc + item.partScore, 0)

    console.log(resultData);


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
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#fbfbfb', p: 2, }}>
                <Typography variant="body1"> Bài kiểm tra: {resultData?.examSummary.title}</Typography>
                <Typography variant="body1"> Thời gian: {resultData?.examSummary.times}</Typography>
                <Typography variant="body1"> Tổng điểm:  <span style={{ color: '#de0000' }}>{resultData.isPublicScore ? resultData.finalScore : 'Chờ chấm điểm'}</span> / {scoreExam}</Typography>
            </Box>

            {resultData && resultData.isPublicScore ?
                resultData.parts.map((part) => (
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

                : <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fbfbfb', py: 5 }}>
                    <Typography variant='body2' fontWeight={'bold'} color={"rebeccapurple"} >
                        Kết quả của bạn đã được lưu lại và chờ giáo viên chấm điểm
                    </Typography>

                </Box>
            }


        </div>
    )
}

// ResultExam.getLayout = function getLayout(page) {
//     return <Container>{page}</Container>;
// };

export default ResultExam;
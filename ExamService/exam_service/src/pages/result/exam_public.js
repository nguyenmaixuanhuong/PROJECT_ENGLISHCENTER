import { Box, Container, Typography } from "@mui/material";
import ResultQuestion from "@/components/resultItem/resultQuestion";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ModalResultDetail from "@/components/resultItem/modalResultDetail";
import Paper from '@mui/material/Paper';

const ResultExam = () => {
    const router = useRouter();
    const resultData = useSelector(state => state.result)

    console.log(resultData);

    if (!resultData) {
        router.push('/error/error500')
    }
    const scoreParts = resultData.parts.map(part => {
        return part.questions.reduce((total, question) => total + question.finalScore, 0)
    })

    return (
        <div style={{ marginTop: '100px' }}>
            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Trang chủ
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Kết quả</Typography>
                </Breadcrumbs>
            </div>
            <Typography textAlign={'center'} mb={3} mt={1} sx={{ backgroundColor: '#0a005a', color: 'white', p: 1, borderRadius: 3 }} variant="h4"> KẾT QUẢ </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    padding: 1,
                    backgroundColor: '#f7f7f7',
                    '& > :not(style)': {
                        m: 1,
                        width: 200,
                        height: 128,
                    },
                }}
            >
                {resultData.parts.map((part, index) =>
                    <>
                        <Paper elevation={2} >
                            <Typography mt={1} color={'#0a005a'} fontWeight={'bold'} textAlign={'center'} variant="body1">{part.partTitle}</Typography>
                            <Typography mt={1} color={'#cd0000'} textAlign={'center'} variant="h3">{scoreParts[index]}</Typography>
                        </Paper>
                    </>

                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <ModalResultDetail scoreParts={scoreParts} resultData={resultData} />
            </Box>


            <Box sx={{ mt: 2 }}>
                <Typography mb={3} sx={{ width: 'fit-content', color: '#cd0000', borderBottom: '2px solid #0a005a' }} variant="h6"> Gợi ý khóa học : </Typography>
            </Box>

        </div>
    )
}

export default ResultExam;
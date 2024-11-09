import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ModalResultDetail from "@/components/resultItem/modalResultDetail";
import Paper from '@mui/material/Paper';
import getCourseSuggest from "../api/getCourseSuggest";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
const ResultExam = () => {
    const router = useRouter();
    const resultData = useSelector(state => state.result)
    const [scoreParts, setCourseSkills] = useState([])
    const [courseSuggest, setCourseSuggest] = useState()

    if (!resultData) {
        router.push('/error/error500')
    }

    useEffect(() => {
        // Tạo hàm async bên trong useEffect
        const fetchData = async () => {
            try {
                const scoreParts = resultData.parts.map(part => {
                    const score_skill = {
                        skill: part.partTitle,
                        score: part.questions.reduce((total, question) => total + question.finalScore, 0)
                    }
                    return score_skill
                })
                setCourseSkills(scoreParts)

                const data = await getCourseSuggest(scoreParts);

                if (data) {
                    setCourseSuggest(data)
                }
                // else {
                //     router.push('/error/error500')
                // }
            } catch (error) {
                console.error("Error fetching course suggestions:", error);
                router.push('/error/error500')
            }
        }

        // Gọi hàm async
        fetchData();

        // Nếu cần clean-up (trong trường hợp bạn có websocket hay API subscription, bạn có thể thêm clean-up function tại đây)
        return () => {
            // Dọn dẹp nếu cần
        }
    }, [resultData, router]); // Đảm bảo các dependency để useEffect chạy lại khi cần

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
                            <Typography mt={1} color={'#cd0000'} textAlign={'center'} variant="h3">{scoreParts[index]?.score}</Typography>
                        </Paper>
                    </>

                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <ModalResultDetail scoreParts={scoreParts} resultData={resultData} />
            </Box>


            <Box sx={{ my: 3 }}>
                <Typography mb={3} sx={{ width: 'fit-content', color: '#cd0000', borderBottom: '2px solid #0a005a' }} variant="h6"> Gợi ý khóa học : </Typography>
                <Typography mb={3} variant="body2">Nhận xét: {courseSuggest?.Feedback} </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {courseSuggest ? courseSuggest.Courses.map((course) => (
                        <Card sx={{ width: 300, mx: 2, my: 1 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={course.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {course.nameCourse}
                                </Typography>
                                <Typography gutterBottom variant="caption" component="div">
                                    (Dành cho {course.category})
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button target='_blank' href={`http://localhost:3000/coursedetail/${course._id}`} size="medium">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))
                        : <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Image src={"/images/image/loading.gif"} width={100} height={100} ></Image>
                            <Typography gutterBottom variant="body2" component="div" color={'rgb(25, 118, 210)'}>
                                Hệ thống đang gợi ý khóa học phù hợp với bạn...
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>

        </div>
    )
}

export default ResultExam;
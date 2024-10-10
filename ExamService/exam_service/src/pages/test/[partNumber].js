import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from "./test.module.scss"
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import TestLayout from '@/components/layouts/TestLayout';
import Question from '@/components/testItem/testQuestion';
const PartPage = () => {
    const router = useRouter();
    const { partNumber } = router.query;
    const exam = useSelector((state) => state.exam)
    const user = useSelector((state) => state.user.user);
    const questions = useSelector((state) => state.question.list)
    const parts = exam.part
    const currentPart = parts.find((part) => part.number === parseInt(partNumber));
    const [answer, setAnswer] = useState();
    const existingGuestId = localStorage.getItem('guestId');
    const [guestId, setGuestId] = useState(existingGuestId);

    useEffect(() => {
        const handleFetchAnswer = async () => {
            const res = await fetch(`/api/getAnswer?userId=${user && user._id ? user._id : guestId}&&examId=${exam.id}&&partNumber=${partNumber}`);
            const data = await res.json();

            console.log(data);
            setAnswer(data);
        }
        handleFetchAnswer();
    }, [partNumber, user, exam])

    const handleSaveAnswer = async (questionId, answer) => {

        console.log('audiotesst', questionId, answer);

        const res = await fetch('/api/saveAnswerTemp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user ? user._id : guestId,
                examId: exam.id,
                partNumber: partNumber,
                result: { questionId, answer },

            })
        });
    }
    // Hàm xử lý khi nhấn nút "Next"
    const handleNext = () => {
        const nextPart = parseInt(partNumber) + 1;
        if (nextPart <= parts.length) {
            router.push(`/test/${nextPart}`);
        }
    };

    const handlePrev = () => {
        const prevPart = parseInt(partNumber) - 1;
        if (prevPart >= 1) {
            router.push(`/test/${prevPart}`);
        }
    };


    if (!currentPart) return <div>Part not found</div>;

    return (
        <div>
            <div className={styles.test_container}>
                <Box sx={{ backgroundColor: 'aliceblue', boxShadow: "2px 2px 5px #bcbcbc ", py: 2 }}>
                    <Typography textAlign={'center'} pb={2} variant="h6">{exam?.summary.title}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Typography variant="body2">Câu hỏi: {questions.length} phút</Typography>
                        <Typography variant="body2">Thời gian : {exam?.summary.times} phút</Typography>

                    </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant='h5' textAlign={'center'}>Phần {currentPart.number}: {currentPart.title}</Typography>
                    {currentPart.audioFile &&
                        <Box sx={{ m: 'auto', width: '80%' }}>
                            <audio style={{ marginTop: '20px', width: '100%' }} controls>
                                <source src={currentPart.audioFile.url} type="audio/mp3" />
                            </audio>
                        </Box>
                    }
                    {currentPart.passage &&
                        <TextField
                            sx={{ mt: 3 }}
                            multiline
                            rows={20}
                            value={currentPart.passage}
                            id="standard-basic"
                            fullWidth label="Đoạn văn"
                            variant="outlined" />
                    }
                    <ul>
                        {currentPart.questions.map((question, index) => {
                            let savedAnswer;
                            if (answer) {
                                savedAnswer = answer[question._id]; // Tìm câu trả lời tương ứng với questionId
                            }

                            return (
                                currentPart.type === 'Custom'
                                    ? <Question
                                        handleSaveAnswer={handleSaveAnswer}
                                        type={question.questionType}
                                        question={question}
                                        savedAnswer={savedAnswer} // Truyền câu trả lời đã lưu vào component
                                    />
                                    : <Question
                                        handleSaveAnswer={handleSaveAnswer}
                                        type={currentPart.type}
                                        question={question}
                                        savedAnswer={savedAnswer} // Truyền câu trả lời đã lưu vào component
                                    />
                            );
                        })}

                    </ul>

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
                    <Button variant='outlined' onClick={handlePrev} disabled={currentPart.number === 1}>
                        Back
                    </Button>
                    <Button variant='contained' onClick={handleNext} disabled={currentPart.number === parts.length}>
                        Next
                    </Button>
                </Box>
            </div>

        </div>
    );
};

PartPage.getLayout = function getLayout(page) {
    return <TestLayout><Container>{page}</Container></TestLayout>;
};
export default PartPage;

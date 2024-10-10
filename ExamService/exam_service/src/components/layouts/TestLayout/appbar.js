import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import UpdateIcon from '@mui/icons-material/Update';
import Drawer from '@mui/material/Drawer';
import BallotIcon from '@mui/icons-material/Ballot';
import { IconButton } from '@mui/material';
import CountdownTimer from '@/components/countDownTimer';
import ModalConfirm from './modalConfirm';
import { submitAnswer } from '@/pages/api/submitAnswer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { submitAnswerGuest } from '@/pages/api/submitAnswerGuest';
import { useDispatch } from 'react-redux';
import { setResultExam } from '@/store/resultExam';
function TestAppBar() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const questions = useSelector((state) => state.question.list)
    const exam = useSelector((state) => state.exam)
    const user = useSelector((state) => state.user.user);
    const guestId = localStorage.getItem('guestId');
    const router = useRouter();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const userSubmit = async (answerSubmit) => {
        const response = await submitAnswer(answerSubmit)

        if (!response) {
            setLoading(false)

            toast.error('Đã có lỗi xảy ra, vui lòng thử lại ')
        }
        else {
            await fetch('/api/deleteAnswer', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user ? user._id : guestId,
                    examId: exam.id,
                })
            });
            localStorage.setItem('testSubmitted', 'true');
            localStorage.setItem('timeLeft', null)
            localStorage.setItem('timestamp', null)
            await router.replace(`/result/${exam.id}`)
            setLoading(false)
        }
    }

    const guestSubmit = async (answerSubmit) => {
        const response = await submitAnswerGuest(answerSubmit)

        if (!response) {
            setLoading(false)
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại ')
        }
        else {
            await fetch('/api/deleteAnswer', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user ? user._id : guestId,
                    examId: exam.id,
                })
            });
            dispatch(setResultExam(response))
            localStorage.setItem('testSubmitted', 'true');
            localStorage.setItem('timeLeft', null)
            localStorage.setItem('timestamp', null)
            await router.replace(`/result/exam_public`)
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        const res = await fetch(`/api/getAllAnswer?userId=${user && user._id ? user._id : guestId}&&examId=${exam.id}`);
        const data = await res.json();
        const answers = [];
        if (data) {
            for (const part of data) {
                for (const [key, value] of Object.entries(part.results)) {
                    const result = JSON.parse(value);
                    const answerInfo = {
                        questionId: key,
                        answer: result.answer,
                        isCorrect: result.isCorrect
                    }
                    answers.push(answerInfo);

                }
            }

        }

        if (user && user._id) {
            const answerSubmit = {
                examId: exam.id,
                userId: user._id,
                answers: answers
            }
            userSubmit(answerSubmit)


        }

        else {
            const answerSubmit = {
                examId: exam.id,
                guestId: guestId,
                answers: answers
            }
            guestSubmit(answerSubmit)

        }

    }
    const DrawerList = (
        <Box sx={{ width: 400, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
            <Typography variant='h5' textAlign={'center'}>Câu hỏi</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                {questions.map((question, index) => (
                    <Button key={question._id} variant='outlined' sx={{ width: '50px', height: 50, m: 1, }}>
                        <Typography variant='h6' textAlign={'center'}>{index + 1}</Typography>
                    </Button>
                ))}
            </Box>
        </Box>

    );

    return (
        <AppBar position="fixed" variant='outlined' sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ModalConfirm exam={exam} type='exit' ></ModalConfirm>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent: "center", alignItems: "center", color: 'green' }}>
                        <UpdateIcon fontSize='large'></UpdateIcon>
                        <CountdownTimer handleSubmit={handleSubmit} initialTime={exam?.summary.times * 60}></CountdownTimer>
                    </Box>
                    <div>
                        <IconButton sx={{ mr: 3 }} onClick={toggleDrawer(true)}>
                            <BallotIcon fontSize='large' color='primary'></BallotIcon>
                        </IconButton>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>
                    <ModalConfirm handleSubmit={handleSubmit} exam={exam} type={'end'} loading={loading}></ModalConfirm>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default TestAppBar;

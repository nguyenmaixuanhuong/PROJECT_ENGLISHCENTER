import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { exitCreateExam } from '@/store/examSlice';
import { toast } from 'react-toastify';
import { createExam } from '@/pages/api/createExam';
import { useRouter } from 'next/router';
export default function AppBarComponent() {
    const [value, setValue] = React.useState('1');
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = React.useState({
        summary: false,
        question: [],
        part: []
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const exam = useSelector((state) => state.exam);
    const { status } = router.query;
    const userId = useSelector((state) => state?.user.user._id);

    const isCheckChoice = (choices) => {
        for (let choice of choices) {
            if (choice.isCorrect) {
                return true;
            }
        }
        return false;
    }

    const checkValidate = () => {
        const summary = exam.summary;
        const parts = exam.part;
        let newError = { summary: false, question: [], part: [] };

        // Kiểm tra summary
        if (summary && Object.keys(summary).length > 0) {
            if (summary['title'] === null) {
                newError.summary = true;
            }
            else {
                newError.summary = false;
            }

        } else {
            newError.summary = true;
        }

        // Kiểm tra parts và questions
        for (let part of parts) {
            if (part.type === 'Listening' && !part.hasOwnProperty('audioFile')) {
                if (!newError.part.some(x => x.number === part.number)) {
                    newError.part.push({ number: part.number, message: "Chưa có file audio" });
                }
            }
            for (let question of part.questions) {
                if (question.questionText === '') {
                    if (!newError.question.some(x => x.number === question.number)) {
                        newError.question.push({ number: question.number, message: "Câu hỏi rỗng" });
                    }
                }

                if (question.hasOwnProperty('choices')) {
                    if (!isCheckChoice(question.choices)) {
                        if (!newError.question.some(x => x.number === question.number)) {
                            newError.question.push({ number: question.number, message: "Chưa chọn đáp án" });
                        }
                    }
                }
            }
        }
        setError(newError);
    };



    React.useEffect(() => {
        checkValidate();
    }, [exam]);

    const CreateExam = async () => {
        // checkValidate();
        if (error.summary || error.question.length > 0 || error.part.length > 0) {
            toast.error('Vui lòng nhập đầy đủ thông tin chung');
            if (error.question.length > 0) {
                toast.error(
                    <>
                        {error.question.map((errorItem, index) => (
                            <p key={index}>Câu {errorItem.number}: {errorItem.message}</p>
                        ))}
                    </>
                );
            }
            if (error.part.length > 0) {
                toast.error(
                    <>
                        {error.part.map((errorItem, index) => (
                            <p key={index}>Phần {errorItem.number} Listening: {errorItem.message}</p>
                        ))}
                    </>
                );
            }
        } else {
            const statusRespone = await createExam(exam, userId);
            if (statusRespone === 200) {
                toast.success('Tạo bài kiểm tra thành công');
                dispatch(exitCreateExam());
                if (status === 'loading') {
                    await fetch('/api/deleteExamDraft', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId, draftId: exam?.id })
                    });
                }
                router.push('/exams')
            }
            else {
                toast.error("đã có lỗi xảy ra, vui lòng thử lại")
            }
        }
    };

    const handleSaveExamDraft = async () => {
        const res = await fetch('/api/saveExamDraft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, exam })
        });
        const status = res.status;
        if (status === 200) {
            router.push('/exams')
            dispatch(exitCreateExam());
        }
        else {
            toast.error('Đã có lỗi xảy ra')
        }
    }

    const handleUpdateExamDraft = async () => {
        const res = await fetch('/api/updateExamDraft', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, draftId: exam.id, updatedDraft: exam })
        });
        const status = res.status;
        if (status === 200) {
            router.push('/exams')
            dispatch(exitCreateExam());
        }
        else {
            console.log(res);

            toast.error('Đã có lỗi xảy ra')
        }
    }
    const handleUpdateExam = async () => {
        const res = await fetch('/api/updateExam', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exam: exam })
        });
        const status = res.status;
        if (status === 200) {
            router.push('/exams')
            dispatch(exitCreateExam());
        }
        else {
            console.log(res);
            toast.error('Đã có lỗi xảy ra')
        }
    }

    return <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ backgroundColor: "white" }} position="fixed">
                <Toolbar>
                    <Link href={"/exams"} onClick={() => { dispatch(exitCreateExam()) }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}

                        >
                            <CloseIcon />
                        </IconButton>
                    </Link>
                    <Box sx={{ typography: 'body1', flexGrow: 1 }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab sx={{ mr: 3 }}
                                        label={
                                            <Link style={{ textDecoration: "none", color: "black" }} href={`/exams/create-exam?status=${status}`}>
                                                Bài Kiểm Tra
                                            </Link>}
                                        value="1" />
                                    <Tab
                                        label={
                                            <Link style={{ textDecoration: "none", color: "black" }} href={`/exams/submisstions?examId=${exam.id}&&status=${status}`}>
                                                Các Bài Nộp
                                            </Link>
                                        } value="2" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                    {value == '2' || status === 'end' || status === 'now' ? ''
                        : <>
                            {status === 'update' ?
                                <Button variant='contained' onClick={handleUpdateExam} >Cập Nhật</Button>
                                :
                                <>
                                    <Button variant='outlined' sx={{ mr: 2 }} onClick={() => {
                                        if (status === 'loading') {
                                            handleUpdateExamDraft();
                                        }
                                        else {
                                            handleSaveExamDraft();
                                        }
                                    }} >Lưu Nháp</Button>
                                    <Button variant='contained' onClick={CreateExam} >Đăng Bài</Button>
                                </>
                            }
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    </div >;
};

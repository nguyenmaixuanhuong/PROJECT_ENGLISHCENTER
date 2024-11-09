import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExamLayout from '@/components/layouts/ExamLayout';
import styles from './exam.module.scss'
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import BasicStructure from '@/components/structureExam/basic';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import PhotoFilterIcon from '@mui/icons-material/PhotoFilter';
import { addNewQuestion, setQuestions, setSummary } from '@/store/examSlice';
import dayjs from 'dayjs';
import SetExamInClass from '@/components/modal/setExamInClass';
import { getClasses } from '../api/classes';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const { userId } = context.query;
    const role = 'Teacher';
    const classes = await getClasses(userId, role);

    return { props: { classes } }

}
const CreateExam = ({ classes }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { status } = router.query;
    const exam = useSelector((state) => state.exam);
    const elementsRedux = exam.part;
    const [checked, setChecked] = React.useState({
        "scope": true,
        "times": true,
        "startTime": true,
        "endTime": true,
        "autoGrade": false,
        "attempts": true,
    });

    React.useEffect(() => {
        if (exam.summary?.scope) {
            setChecked((prev) => ({
                ...prev,
                scope: exam.summary.scope.isPublic
            }));
        }

        if (exam.summary?.autoGrade) {
            setChecked((prev) => ({
                ...prev,
                autoGrade: exam.summary.autoGrade
            }));
        }
    }, [])

    const [inforExams, setInforExams] = React.useState({
        "title": '',
        "description": '',
        "scope": {
            isPulic: true,
            classes: []
        },
        "times": null,
        "startTime": null,
        "endTime": null,
        "autoGrade": true,
        "attempts": 1
    })

    const [elements, setElements] = React.useState(elementsRedux)
    React.useEffect(() => {
        if (exam) {
            setInforExams({
                ...exam.summary,
                startTime: exam.summary?.startTime ? dayjs(exam.summary?.startTime) : null,
                endTime: exam.summary?.endTime ? dayjs(exam.summary?.endTime) : null
            });
        }
        if (elementsRedux.length === 0) {
            const initialElements = [
                {
                    title: '',
                    number: 1,
                    questions: [],
                    type: 'Custom'
                }
            ];
            setElements(initialElements);
            dispatch(setQuestions(initialElements)); // Dispatch để cập nhật Redux store với giá trị mặc định
        } else {

            setElements(elementsRedux);
        }
    }, [elementsRedux]);

    const addPart = () => {
        const newPart = {
            title: '',
            number: elements.length + 1,
            questions: [],
            type: 'Custom'

        }
        setElements(prevElements => {
            const updatedElements = [...prevElements, newPart];
            dispatch(setQuestions(updatedElements));
            return updatedElements;
        });
    }

    const addQuestion = () => {
        setElements(prevElements => {
            const newElements = [...prevElements];
            const lastPartIndex = newElements.length - 1;
            const tmp = lastPartIndex - 1
            let newQuestion;

            if (tmp >= 0) {
                if (newElements[lastPartIndex].questions.length > 0) {


                    newQuestion = {
                        "number": newElements[lastPartIndex].questions[newElements[lastPartIndex].questions.length - 1].number + 1,
                        "questionText": '',
                        "score": 0
                    };
                }
                else {
                    newQuestion = {
                        "number": newElements[lastPartIndex - 1].questions[newElements[lastPartIndex - 1].questions.length - 1].number + 1,
                        "questionText": '',
                        "score": 0
                    };
                }
            }
            else {
                newQuestion = {
                    "number": newElements[lastPartIndex].questions.length + 1,
                    "questionText": '',
                    "score": 0
                };
            }

            newElements[lastPartIndex] = {
                ...newElements[lastPartIndex],
                questions: [...newElements[lastPartIndex].questions, newQuestion]
            };

            const score = newElements[lastPartIndex].score / (newElements[lastPartIndex].questions.length > 0 ? newElements[lastPartIndex].questions.length : 1);


            const questionsUpdateScore = newElements[lastPartIndex].questions.map((question) => {
                return {
                    ...question,
                    score: score
                }
            })

            newElements[lastPartIndex] = {
                ...newElements[lastPartIndex],
                questions: questionsUpdateScore
            };
            const question = {
                numberPart: newElements[lastPartIndex].number,
                newQuestion: newQuestion,
            }
            // dispatch(setQuestions(newElements))
            dispatch(addNewQuestion(question))
            return newElements;
        });
    }
    const handleChangeInfor = async (e) => {
        const { name, value } = e.target;
        let newValue = value;
        let dispatchUpdateInfor;
        // Ensure you have a consistent type for the 'times' field
        if (name === "times" || name === "attempts") {
            if (!Number.parseInt(value)) {
                newValue = ''; // or handle this case as needed
            } else if (Number.parseInt(value) < 0) {
                newValue = 0;
            }
        }
        // Update state based on the modified value
        setInforExams(preInfor => {
            const updatedInfor = { ...preInfor, [name]: newValue };
            dispatchUpdateInfor = updatedInfor;
            return updatedInfor;
        });

        dispatch(setSummary(dispatchUpdateInfor));
    };

    const handleChangeChecked = (e) => {

        if (e.target.name === 'scope') {
            let scope = {
                isPublic: true,
                classes: []
            }
            const isChecked = e.target.checked;
            if (!isChecked) {
                scope.isPublic = false;
                scope.classes = exam.summary.scope?.classes ? exam.summary.scope?.classes : []
            }
            setChecked({ ...checked, [e.target.name]: isChecked });
            setInforExams(preInfor => {
                const updatedInfor = { ...preInfor, ['scope']: scope };
                dispatch(setSummary(updatedInfor));
                return updatedInfor;
            });
        }
        else if (e.target.name === 'autoGrade') {
            const isChecked = e.target.checked;
            setChecked({ ...checked, [e.target.name]: isChecked });
            setInforExams(preInfor => {
                const updatedInfor = { ...preInfor, ['autoGrade']: isChecked };

                dispatch(setSummary(updatedInfor));
                return updatedInfor;
            });
        }
        else {
            setChecked({ ...checked, [e.target.name]: e.target.checked });
            setInforExams(preInfor => {
                const updatedInfor = { ...preInfor, [e.target.name]: null };

                dispatch(setSummary(updatedInfor));
                return updatedInfor;
            });
        }

    };
    const setClassInScope = (scope) => {
        setInforExams(preInfor => {
            const updatedInfor = { ...preInfor, ['scope']: scope };
            return updatedInfor;
        });
    }

    return (
        <div className={styles.exams_container}>
            <div className={styles.exam_summary} >
                <Paper elevation={2} sx={{ padding: 3, maxWidth: 850, m: "auto" }} >
                    <h3> Thông tin chung</h3>
                    <Divider sx={{ py: 1 }}></Divider>
                    <div className={styles.summary_item}>
                        <TextField
                            disabled={status === 'now' || status === 'end' ? true : false}
                            name='title'
                            value={inforExams.title}
                            onChange={handleChangeInfor}
                            id="standard-basic"
                            fullWidth label="Tiêu đề bài kiểm tra"
                            variant="standard" />
                    </div>
                    <div className={styles.summary_item}>
                        <TextField
                            disabled={status === 'now' || status === 'end' ? true : false}
                            name='description'
                            value={inforExams.description}
                            onChange={handleChangeInfor}
                            id="standard-basic"
                            fullWidth label="Mô tả ngắn gọn"
                            rows={3} variant="standard" />
                    </div>
                    <div className={styles.summary_item}>
                        <h4>
                            Thiết Lập
                        </h4>
                        <div className={styles.summary_switch}>
                            <Switch
                                name='scope'
                                checked={checked.scope}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={status === 'now' || status === 'end' ? true : false}
                            />
                            {checked.scope ?
                                <div>
                                    <p style={{ fontWeight: "bold" }}>Công khai:</p>
                                    <p style={{ fontSize: 14, }}>Bất kỳ ai cũng có thể tham gia bài kiểm tra này</p>
                                </div>
                                :
                                <>
                                    <SetExamInClass setClassInScope={setClassInScope} status={status} classes={classes}></SetExamInClass>

                                </>
                            }
                        </div>
                        {!checked.scope &&
                            <Box sx={{ my: 2 }} >
                                <p style={{ fontWeight: "bold" }}>Thành viên tham gia:</p>
                                {exam.summary.scope?.classes.map((item) => (
                                    <Button sx={{ my: 2, display: 'block' }} variant='outlined' >{item.className}</Button>
                                ))}
                            </Box>
                        }
                        <div className={styles.summary_switch}>
                            <Switch
                                disabled={status === 'now' || status === 'end' ? true : false}
                                name='times'
                                checked={checked.times}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                <p style={{ fontWeight: "bold" }}>Thời gian làm bài:</p>
                                <p style={{ fontSize: 14, }}>Thời gian tối đa làm bài kiểm tra khi bắt đầu</p>
                            </div>
                            {checked.times ?
                                <TextField
                                    disabled={status === 'now' || status === 'end' ? true : false}
                                    name='times'
                                    value={inforExams.times}
                                    onChange={handleChangeInfor}
                                    id="outlined-basic"
                                    placeholder='0'
                                    variant="outlined"
                                    sx={{ width: "100px", ml: "auto" }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Phút</InputAdornment>
                                    }}
                                />
                                :
                                ""
                            }
                        </div>
                        <div className={styles.summary_switch}>
                            <Switch
                                name='startTime'
                                checked={checked.startTime}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={status === 'now' || status === 'end' ? true : false}
                            />
                            <div>
                                <p style={{ fontWeight: "bold" }}>Thời gian bắt đầu:</p>
                                <p style={{ fontSize: 14, }}>Thời gian người dùng có thể bắt đầu tham gia bài thi</p>
                            </div>
                            {checked.startTime ?
                                <div style={{ marginLeft: "auto" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            disabled={status === 'now' || status === 'end' ? true : false}
                                            name='startTime'
                                            value={inforExams.startTime}
                                            onChange={(newValue) => setInforExams(preInfor => {
                                                const updatedInfor = { ...preInfor, ["startTime"]: newValue };
                                                dispatch(setSummary(updatedInfor));
                                                return updatedInfor;
                                            })}
                                            label="Thời gian bắt đầu"
                                            maxDateTime={inforExams.endTime}
                                            disablePast />
                                    </LocalizationProvider>
                                </div>
                                :
                                ""
                            }
                        </div>
                        <div className={styles.summary_switch}>
                            <Switch
                                disabled={status === 'now' || status === 'end' ? true : false}
                                name='endTime'
                                checked={checked.endTime}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                <p style={{ fontWeight: "bold" }}>Thời gian kết thúc:</p>
                                <p style={{ fontSize: 14, }}>Qua thời gian này người dùng không thể tham gia bài làm được nữa</p>
                            </div>
                            {checked.endTime ?
                                <div style={{ marginLeft: "auto" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            disabled={status === 'now' || status === 'end' ? true : false}
                                            name='endTime'
                                            value={inforExams.endTime}
                                            onChange={(newValue) => setInforExams(preInfor => {
                                                const updatedInfor = { ...preInfor, ["endTime"]: newValue };
                                                dispatch(setSummary(updatedInfor));
                                                return updatedInfor;
                                            })}
                                            label="Thời gian kết thúc"
                                            minDateTime={inforExams.startTime}
                                            disablePast />
                                    </LocalizationProvider>
                                </div>
                                :
                                ""
                            }
                        </div>
                        <div className={styles.summary_switch}>
                            <Switch
                                disabled={status === 'now' || status === 'end' ? true : false}
                                name='attempts'
                                checked={checked.attempts}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                <p style={{ fontWeight: "bold" }}>Số lần làm bài:</p>
                                {checked.attempts
                                    ? <p style={{ fontSize: 14, }}>Bạn có thể đặt số lần mà học viên có thể làm bài kiểm tra này</p>
                                    : <p style={{ fontSize: 14, }}>Học viên có thể làm bài này vô số lần</p>
                                }
                            </div>
                            {checked.attempts ?
                                <TextField
                                    disabled={status === 'now' || status === 'end' ? true : false}
                                    name='attempts'
                                    value={inforExams.attempts}
                                    onChange={handleChangeInfor}
                                    id="outlined-basic"
                                    placeholder='0'
                                    variant="outlined"
                                    sx={{ width: "100px", ml: "auto" }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Lần</InputAdornment>
                                    }}
                                />
                                :
                                ""
                            }
                        </div>
                        <div className={styles.summary_switch}>
                            <Switch
                                name='autoGrade'
                                checked={checked.autoGrade}
                                onChange={handleChangeChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disabled={status === 'now' || status === 'end' ? true : false}
                            />
                            {checked.autoGrade ?
                                <div>
                                    <p style={{ fontWeight: "bold" }}>Tự động chấm diểm:</p>
                                    <p style={{ fontSize: 14, }}>Hệ thống sẽ tự động chấm diểm và trả kết quả về cho học viên</p>

                                </div>
                                :
                                <>
                                    <p>Hệ thống sẽ lưu bài kiểm tra và bạn sẽ là người chấm điểm </p>

                                </>
                            }
                        </div>
                    </div>
                </Paper>
                {
                    status === 'now' || status === 'end'
                        ? ''
                        : <div className={styles.exam_tools}>
                            <Button sx={{ m: 1, color: "rgb(16, 16, 89)" }} onClick={addPart}>
                                <AutoAwesomeMosaicIcon sx={{ mr: 1 }}></AutoAwesomeMosaicIcon>
                                <p> Tạo Phần Mới</p>
                            </Button>
                            <Button sx={{ m: 1, color: "rgb(16, 16, 89)" }}>
                                <PhotoFilterIcon></PhotoFilterIcon>
                                <p>Tạo tự động</p>
                            </Button>
                            <Button onClick={addQuestion} sx={{ m: 1, backgroundColor: "rgb(16, 16, 89)" }} variant='contained'> + Thêm câu hỏi</Button>
                        </div>
                }
                <div className={styles.exam_structure} >
                    <BasicStructure elements={elements}></BasicStructure>
                </div>
            </div>
        </div>
    );
};

CreateExam.getLayout = function getLayout(page) {
    return <ExamLayout><Container>{page}</Container></ExamLayout>;
};

export default CreateExam;
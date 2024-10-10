import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Choice from './choiceOption';
import Writing from './writingOption';
import CustomQuestion from './customQuestion';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuestion, setQuestions, updateQuestionScore } from '@/store/examSlice';
import { toast } from 'react-toastify';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Button } from '@mui/material';
export default function Question(props) {
    const dispatch = useDispatch();
    const questions = useSelector(state => state?.exam.part)
    const status = useSelector((state) => state.exam.status)
    const [score, setScore] = React.useState(props?.question.score)
    const [questionText, setQuestionText] = React.useState(props?.question.questionText)

    React.useEffect(() => {
        if (score !== props?.question.score) {
            setScore(props?.question.score)
        }
    }, [props.question.score]);

    const updatedQuestions = (title, value) => {
        const questionUpdated = questions.map((part, index) => {
            if (index === props.part - 1) {
                return {
                    ...part,
                    questions: part.questions.map((question) => {
                        if (question.number === props.question.number) {
                            return {
                                ...question,
                                [title]: value,
                            };
                        }
                        return question;
                    }),
                };
            }
            return part;
        });
        dispatch(setQuestions(questionUpdated));
    }
    const handleChangeChoicesOfQuestion = (choices) => {
        updatedQuestions('choices', choices);
    };

    const handleChangeQuestionText = (e) => {
        setQuestionText(e.target.value);
        updatedQuestions('questionText', e.target.value);
    };

    const handleDeleteQuestion = (number) => {
        const questionDelete = {
            numberPart: props.part,
            questionNumber: number
        }
        dispatch(deleteQuestion(questionDelete))
        toast.success('Deleted questions')
    };

    const handleUpdateScore = (e) => {
        const newScore = e.target.value;
        const updateScore = {
            numberPart: props.part,
            questionNumber: props.question.number,
            newScore: Number(newScore)
        }
        try {

            dispatch(updateQuestionScore(updateScore));
        } catch (error) {
            console.log(error);

            toast.error('Error updating')
        }
    }

    let Answer;
    switch (props.option) {
        case "Writing":
            Answer = <Writing></Writing>
            break;
        case "Listening":
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion} ></Choice>
            break;
        case "Speaking":
            Answer = <Button
                disabled={status === 'now' || status === 'end' ? true : false}
                variant='contained'
                sx={{ my: 2, backgroundColor: "rgb(16, 16, 89)" }}
                fullWidth>
                <KeyboardVoiceIcon />  ghi âm câu trả lời
            </Button>
            break;
        case "Reading":
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion} ></Choice>
            break;
        default:
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion} ></Choice>
            break;
    }
    return (
        <>
            {
                props.option === "Custom" ?
                    <CustomQuestion
                        part={props?.part}
                        question={props?.question}
                        handleDeleteQuestion={handleDeleteQuestion}
                        handleUpdateScore={handleUpdateScore}
                        status={status}
                        score={score}
                    ></CustomQuestion>
                    :
                    <Paper elevation={2} sx={{ p: 3, my: 2, }} d>
                        <Box sx={{ display: "flex", alignItems: "end" }}>
                            <h5> Câu {props?.question.number}</h5>
                            <TextField
                                disabled={status === 'now' || status === 'end' ? true : false}
                                value={questionText}
                                onChange={handleChangeQuestionText}
                                sx={{ mx: 2, width: "90%" }}
                                d="standard-basic"
                                label="Nhập nội dung câu hỏi"
                                variant="standard"
                                multiline

                            />
                        </Box>
                        {Answer}
                        {status === 'now' || status === 'end' ?
                            <TextField
                                sx={{ width: '80px', mt: 2 }}
                                id="outlined-basic"
                                label="Điểm"
                                variant="outlined"
                                value={score}
                                disabled
                                onChange={handleUpdateScore}
                            />
                            : <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                <TextField
                                    sx={{ width: '80px' }}
                                    id="outlined-basic"
                                    label="Điểm"
                                    variant="outlined"
                                    value={score}
                                    onChange={handleUpdateScore}
                                />
                                <IconButton aria-label="delete" onClick={() => { handleDeleteQuestion(props?.question.number) }} >
                                    <DeleteIcon fontSize='large' />
                                </IconButton>
                            </Box>
                        }
                    </Paper>
            }
        </>
    );
}

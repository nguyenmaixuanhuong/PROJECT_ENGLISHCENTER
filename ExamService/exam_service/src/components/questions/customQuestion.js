import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Choice from './choiceOption';
import Writing from './writingOption';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadFile } from '@/context/uploadFile';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions, updateQuestionScore } from '@/store/examSlice';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function CustomQuestion(props) {
    const dispatch = useDispatch();
    const questions = useSelector(state => state?.exam.part)
    const [questionText, setQuestionText] = React.useState(props?.question.questionText)
    const [score, setScore] = React.useState(props?.question.score)

    // React.useEffect(() => {
    //     setScore(props.score)
    // }, [props])

    React.useEffect(() => {
        if (score !== props?.question.score) {
            setScore(props?.question.score)
            // Chỉ gọi khi score thay đổi
            // updatedQuestions('score', score);
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


    React.useEffect(() => {
        updatedQuestions('questionType', 'Choice');
    }, [])

    const [option, setOption] = React.useState('Choice');

    const handleChangeOptions = (event) => {
        setOption(event.target.value);
        updatedQuestions('questionType', event.target.value)

    };

    const handleChangeAudio = async (e) => {
        const audio = e.target.files[0];
        const result = await uploadFile(audio);
        updatedQuestions('audioFile', result);
    }

    const handleChangeChoicesOfQuestion = (choices) => {
        updatedQuestions('choices', choices);
    };


    const handleDelete = () => {
        props.handleDeleteQuestion(props.question.number)
    }

    const handleChangeQuestionText = (e) => {
        setQuestionText(e.target.value);
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
            toast.error('Error updating')
        }
    }
    React.useEffect(() => {
        updatedQuestions('questionText', questionText);
    }, [dispatch, questionText])
    let Answer;
    switch (option) {
        case "Choice":
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion}></Choice>
            break;
        case "Writing":
            Answer = <Writing></Writing>
            break;
        case "Listening":
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion}></Choice>
            break;
        case "Speaking":
            Answer = <Button
                disabled={props.status === 'now' || props.status === 'end' ? true : false}
                variant='contained'
                sx={{ my: 2, backgroundColor: "rgb(16, 16, 89)" }}
                fullWidth>
                <KeyboardVoiceIcon />  ghi âm câu trả lời
            </Button>
            break;
        default:
            Answer = <Choice choices={props.question.choices} handleChoices={handleChangeChoicesOfQuestion}></Choice>
            break;
    }
    return (
        <Paper elevation={2} sx={{ p: 3, my: 2 }}>
            <Box sx={{ display: "flex", alignItems: "end" }}>
                <h5>Câu {props?.question.number}</h5>
                <TextField sx={{ mx: 2, width: "65%" }}
                    onChange={handleChangeQuestionText}
                    value={questionText}
                    id="standard-basic"
                    label="Nhập nội dung câu hỏi"
                    variant="standard"
                    multiline
                    disabled={props.status === 'now' || props.status === 'end' ? true : false}
                />

                <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Options</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option}
                            label="Options"
                            onChange={handleChangeOptions}
                            disabled={props.status === 'now' || props.status === 'end' ? true : false}
                        >
                            <MenuItem selected={true} value={"Choice"}>Choice</MenuItem>
                            <MenuItem value={"Writing"}>Writing</MenuItem>
                            <MenuItem value={"Speaking"}>Speaking</MenuItem>
                            <MenuItem value={"Listening"}>Listening</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                {option === "Listening" ?
                    <Button
                        disabled={props.status === 'now' || props.status === 'end' ? true : false}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload audio file
                        <VisuallyHiddenInput type="file" onChange={handleChangeAudio} />
                    </Button>
                    : ""
                }
            </Box>
            {Answer}
            {
                props.status === 'now' || props.status === 'end' ?
                    <TextField
                        sx={{ width: '80px', mt: 2 }}
                        id="outlined-basic"
                        label="Điểm"
                        variant="outlined"
                        value={score}
                        disabled
                        onChange={handleUpdateScore}
                    />
                    :
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            sx={{ width: '80px' }}
                            id="outlined-basic"
                            label="Điểm"
                            variant="outlined"
                            value={score}
                            onChange={handleUpdateScore}
                        />
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon fontSize='large' />
                        </IconButton>
                    </Box>
            }

        </Paper>
    );
}

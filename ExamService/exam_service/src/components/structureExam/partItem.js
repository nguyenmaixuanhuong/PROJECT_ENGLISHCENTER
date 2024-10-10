import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Question from '../questions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, updatePartScore, setTitlePart, setTypeofPart } from '@/store/examSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { uploadFile } from '@/context/uploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { updatedSTTQuestions } from '@/context/updateQuestions';
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
export default function PartItem(props) {
    const dispatch = useDispatch();
    const parts = useSelector((state) => state.exam.part)
    const status = useSelector((state) => state.exam.status)
    const [title, setTitle] = React.useState(props?.element.title);
    const [option, setOption] = React.useState(props?.element.type);
    const [audio, setAudio] = React.useState(props?.element.audioFile);
    const [passage, setPassage] = React.useState(props?.element.passage);
    const [score, setScore] = React.useState(parts[props.element.number - 1].score || props?.element.score);
    const [scoreQuestion, setScoreQuestion] = React.useState([]);

    const handleChangeTilte = (e) => {
        setTitle(e.target.value);
        const title = {
            "number": e.target.name,
            "title": e.target.value
        }
        dispatch(setTitlePart(title));
    }

    React.useEffect(() => {
        const scoreQuestion = props.element.questions.map((question) => {
            return question.score
        })
        setScoreQuestion(scoreQuestion);
    }, [])


    const handleChangeScore = (e) => {
        const value = e.target.value
        if (value === '') {
            setScore('');
            return;
        }
        if (Number.parseInt(value) > 0) {
            setScore(e.target.value);
            const tmp = {
                "numberPart": e.target.name,
                "newScore": e.target.value
            }
            dispatch(updatePartScore(tmp));

            const totalQuestions = parts[tmp.numberPart - 1].questions.length;
            const scorePerQuestion = tmp.newScore / totalQuestions;

            const questionScores = Array(totalQuestions).fill(scorePerQuestion);
            setScoreQuestion(questionScores);
        }
        else {
            toast.warning('Vui lòng nhập điểm chính xác')
            setScore(null);
        }
    }

    const handleChangeOptions = (event) => {
        const option = {
            "number": event.target.name,
            "type": event.target.value
        }
        dispatch(setTypeofPart(option));
        if (option.type !== "Custom") {
            const title = {
                "number": option.number,
                "title": option.type
            }
            dispatch(setTitlePart(title));
            setTitle(option.type);
        }
        else {
            const title = {
                "number": option.number,
                "title": ''
            }
            dispatch(setTitlePart(title));
            setTitle('');
        }
        setOption(event.target.value);
    };

    const handleChangeAudio = async (e) => {
        const audio = e.target.files[0];
        const result = await uploadFile(audio);
        const questionUpdated = parts.map((part, index) => {
            if (index === props?.element.number - 1) {
                return {
                    ...part,
                    audioFile: result
                };
            }
            return part;
        });

        dispatch(setQuestions(questionUpdated));
        setAudio(result);
    }

    const handleChangePassageReading = async (e) => {
        const passage = e.target.value;
        const questionUpdated = parts.map((part, index) => {
            if (index === props?.element.number - 1) {
                return {
                    ...part,
                    passage: passage
                };
            }
            return part;
        });

        dispatch(setQuestions(questionUpdated));
        setPassage(passage)
    }
    const handleDeletePart = (partNumber) => {
        const partsUpdate = parts.filter(part => (part.number !== partNumber))
            .map((part, index) => {
                return {
                    ...part,
                    number: index + 1,
                }
            })
        const arrangedQuestions = updatedSTTQuestions(partsUpdate);

        dispatch(setQuestions(arrangedQuestions));
        toast.success("Deleted successfully");
    }
    return (
        <Box sx={{ maxWidth: 850, m: "auto", pb: 3 }} >
            <Accordion>
                <AccordionSummary
                    expandIcon={<>
                        <ExpandMoreIcon />
                    </>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <p>Phần {props?.element.number}</p>
                        <Box sx={{ minWidth: 200, ml: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={option}
                                    label="Options"
                                    name={props?.element.number}
                                    onChange={handleChangeOptions}
                                    disabled={status === 'now' || status === 'end' ? true : false}
                                    sx={{ color: 'black' }}

                                >
                                    <MenuItem value={"Custom"}>Custom</MenuItem>
                                    <MenuItem value={"Writing"}>Writing</MenuItem>
                                    <MenuItem value={"Speaking"}>Speaking</MenuItem>
                                    <MenuItem value={"Listening"}>Listening</MenuItem>
                                    <MenuItem value={"Reading"}>Reading</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <TextField
                        disabled={status === 'now' || status === 'end' ? true : false}
                        name={props?.element.number}
                        sx={{ ml: 'auto', width: '70px', mr: 3 }}
                        id="outlined-basic"
                        label="Điểm"
                        variant="outlined"
                        value={score}
                        onChange={handleChangeScore}

                    />
                </AccordionSummary>
                <AccordionDetails>
                    <TextField

                        disabled={status === 'now' || status === 'end' ? true : false}
                        name={props?.element.number}
                        value={title} onChange={handleChangeTilte}
                        id="standard-basic"
                        fullWidth label="Tiêu đề"
                        variant="outlined" />
                    <Box sx={{ mt: 3 }}>
                        {audio ?
                            <audio controls>
                                <source src={audio.url} type="audio/mp3" />
                            </audio>
                            : ''
                        }
                        <br></br>
                        {option === "Listening" &&
                            <Button
                                disabled={status === 'now' || status === 'end' ? true : false}
                                sx={{ mt: 2 }}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                {audio ?
                                    "Change audio file"
                                    : "Upload audio file"
                                }

                                <VisuallyHiddenInput type="file" accept="audio/*" onChange={handleChangeAudio} />
                            </Button>
                        }

                        {option === "Reading" &&
                            <TextField
                                disabled={status === 'now' || status === 'end' ? true : false}
                                name={props?.element.number}
                                multiline
                                rows={15}
                                value={passage}
                                onChange={handleChangePassageReading}
                                id="standard-basic"
                                fullWidth label="Đoạn văn"
                                variant="outlined" />
                        }
                        {status === 'now' || status === 'end' ? ''
                            :
                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <IconButton aria-label="delete" onClick={() => { handleDeletePart(props?.element.number) }} >
                                    <DeleteIcon fontSize='large' />
                                </IconButton>
                            </Box>
                        }
                    </Box>

                </AccordionDetails>
            </Accordion>
            {props?.element.questions.map((question, index) => (
                <Question
                    key={question.number} // Luôn có key để tránh re-render không cần thiết
                    score={scoreQuestion[index]}
                    option={option}
                    part={props?.element.number}
                    question={question}  // Truyền câu hỏi xuống từng component con
                />
            ))}
        </Box>
    );
}

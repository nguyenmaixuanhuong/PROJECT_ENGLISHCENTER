import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import WritingResult from './writingResult';
import ChoiceResult from './choiceResult';
import AudioVoiceResult from './audioVoiceResult';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateScoreAnswer } from '@/store/answerScoreSlice';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function ResultQuestion(props) {
    const [finalScore, setFinalScore] = React.useState();
    const role = useSelector(state => state?.user.role)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (props.result.question.choices.length > 0 && !props.result.finalScore) {
            setFinalScore(0)
        }
        else {
            setFinalScore(props.result.finalScore)
        }
    }, [])

    const handleChangeFinalScore = (e) => {
        const score = e.target.value
        if (!parseInt(score) && score != '' && score != 0) {
            toast.error('Vui lòng nhập điểm là số')
        }
        else if (score == '') {
            setFinalScore(null);
        }
        else if (score > props?.result.question.score) {
            toast.error('Điểm không được lớn hơn điểm tối đa của câu hỏi')
            setFinalScore(null);
        }
        else {
            setFinalScore(score);
            dispatch(updateScoreAnswer({ answerId: props.result.answerId, finalScore: score }));
        }
    }

    let Result;
    switch (props.type) {
        case "Writing":
            Result = <WritingResult result={props.result}></WritingResult>
            break;
        case "Listening":
            Result = <ChoiceResult result={props.result}></ChoiceResult>
            break;
        case "Speaking":
            Result = <AudioVoiceResult result={props.result}></AudioVoiceResult>
            break;
        case "Reading":
            Result = <ChoiceResult result={props.result}></ChoiceResult>
            break;
        default:
            Result = <ChoiceResult result={props.result}></ChoiceResult>
            break;
    }
    return (
        <>
            <Paper elevation={2} sx={{ p: 2, my: 2, }} >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: "flex" }}>
                        <Typography> Câu {props?.result.question.number}: </Typography>
                        <Typography mx={1}>{props?.result.question.questionText}</Typography>
                        <Typography variant='body2' lineHeight={'1.8'} fontWeight={'bold'}>({props?.result.question.score} điểm) </Typography>
                    </Box>

                    <TextField
                        sx={{ width: finalScore || finalScore == 0 ? 75 : 150 }}
                        id="standard-multiline-static"
                        variant="outlined"
                        placeholder={finalScore || finalScore == 0 ? '' : "Chờ chấm điểm"}
                        value={finalScore}
                        focused={false}
                        onChange={handleChangeFinalScore}
                        disabled={role !== 'Teacher' ? true : false}
                    />
                </Box>
                {Result}
            </Paper>

        </>
    );
}

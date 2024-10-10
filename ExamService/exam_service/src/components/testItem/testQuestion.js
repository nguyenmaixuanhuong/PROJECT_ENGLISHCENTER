import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AudioRecorder from './audioVoiceItem';
import WritingTest from './writingTest';
import ChoiceTest from './choiceTest';
import AudioVoiceItem from './audioVoiceItem';
import { Typography } from '@mui/material';
export default function Question(props) {

    const handleSaveAnswer = (answer, isCorrect) => {
        const result = { answer: answer, isCorrect: isCorrect };

        props.handleSaveAnswer(props.question._id, result)
    }


    let Answer;
    switch (props.type) {
        case "Writing":
            Answer = <WritingTest answer={props.savedAnswer} handleChangeAnswer={handleSaveAnswer}></WritingTest>
            break;
        case "Listening":
            Answer = <ChoiceTest answer={props.savedAnswer} handleChangeAnswer={handleSaveAnswer} choices={props.question.choices}></ChoiceTest>
            break;
        case "Speaking":
            Answer = <AudioVoiceItem answer={props.savedAnswer} handleChangeAnswer={handleSaveAnswer}></AudioVoiceItem>
            break;
        case "Reading":
            Answer = <ChoiceTest answer={props.savedAnswer} handleChangeAnswer={handleSaveAnswer} choices={props.question.choices}></ChoiceTest>
            break;
        default:
            Answer = <ChoiceTest answer={props.savedAnswer} handleChangeAnswer={handleSaveAnswer} choices={props.question.choices}></ChoiceTest>
            break;
    }
    return (
        <>
            <Paper elevation={2} sx={{ p: 3, my: 2, }} >
                <Box sx={{ display: "flex", alignItems: "end" }}>
                    <Typography> Câu {props?.question.number}: </Typography>
                    <Typography ml={2}>{props?.question.questionText}</Typography>
                </Box>
                {Answer}
            </Paper>

        </>
    );
}

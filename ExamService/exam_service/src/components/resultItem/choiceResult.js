import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
export default function ChoiceResult({ result }) {

    return (
        <>
            <FormControl sx={{ mt: 3, width: "100%" }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={result.userAnswer}

                >
                    {result.question.choices && result.question.choices.map(choice => (
                        <FormControlLabel
                            value={choice.choiceValue}
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', color: choice.isCorrect ? 'green' : result.userAnswer === choice.choiceValue ? 'red' : 'black' }}>
                                    <p >{choice.choiceText} </p>
                                    {!choice.isCorrect && result.userAnswer === choice.choiceValue && <CloseIcon sx={{ ml: 1 }} />}
                                </Box>
                            }

                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}
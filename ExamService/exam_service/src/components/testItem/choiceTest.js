import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ChoiceTest({ handleChangeAnswer, choices, answer }) {
    const [value, setValue] = React.useState();
    React.useEffect(() => {

        if (answer) {
            const answerSaved = JSON.parse(answer);
            const choice = answerSaved.answer
            setValue(choice);
        }
        else {
            setValue(null);

        }
    }, [answer])
    const handleChange = (event) => {
        const choiceValue = event.target.value
        setValue(choiceValue);
        const choiceResult = choices.filter((choice) => choice.choiceValue === choiceValue)
        if (choiceResult[0].isCorrect) {
            handleChangeAnswer(choiceResult[0].choiceValue, true)
        }
        else {
            handleChangeAnswer(choiceResult[0].choiceValue, false)

        }
    };

    return (
        <>
            <FormControl sx={{ mt: 3, width: "100%" }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={`${value}`}
                    onChange={handleChange}

                >
                    {choices && choices.map(choice => (
                        <FormControlLabel
                            value={choice.choiceValue}
                            control={<Radio />}
                            label={<p>{choice.choiceText}</p>} />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}
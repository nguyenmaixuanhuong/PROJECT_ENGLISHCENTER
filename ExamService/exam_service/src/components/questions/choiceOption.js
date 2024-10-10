import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const choicesDefault = [{
    "choiceValue": 'A',
    "isCorrect": false,
    "choiceText": ''
},
{
    "choiceValue": 'B',
    "isCorrect": false,
    "choiceText": ''
},
{
    "choiceValue": 'C',
    "isCorrect": false,
    "choiceText": ''
},
{
    "choiceValue": 'D',
    "isCorrect": false,
    "choiceText": ''
}]
export default function ChoiceOption({ handleChoices, choices }) {
    const [value, setValue] = React.useState('');
    const [choicesState, setChoices] = React.useState(choicesDefault);
    const status = useSelector((state) => state.exam.status)

    React.useEffect(() => {
        if (choices) {
            setChoices(choices);
            for (let choice of choices) {
                if (choice.isCorrect) {
                    setValue(choice.choiceValue);
                }
            }
        }

    }, [choices])
    const handleChange = (event) => {
        const choiceValue = event.target.value
        setValue(choiceValue);

        const choicesUpdate = choicesState.map((choice) => {
            if (choice.choiceValue === choiceValue) {
                return {
                    ...choice,
                    isCorrect: true,
                }
            }
            else {
                return {
                    ...choice,
                    isCorrect: false,
                }
            }
        })

        setChoices(choicesUpdate);
        handleChoices(choicesUpdate);
    };

    const handleChangeTextChoice = (event) => {
        const choiceValue = event.target.name
        const choiceText = event.target.value

        const choicesUpdate = choicesState.map((choice) => {
            if (choice.choiceValue === choiceValue) {
                return {
                    ...choice,
                    choiceText: choiceText,
                }
            }
            return choice;
        })
        setChoices(choicesUpdate);
        handleChoices(choicesUpdate);

    };

    return (
        <>
            <FormControl sx={{ mt: 3, width: "100%" }}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}

                >
                    {choicesState.map(choice => (
                        <FormControlLabel
                            value={choice.choiceValue}
                            control={<Radio />}
                            disabled={status === 'now' || status === 'end' ? true : false}
                            label={
                                <TextField sx={{ mb: 3, width: "550px" }}
                                    value={choice.choiceText}
                                    onChange={handleChangeTextChoice}
                                    id="standard-basic"
                                    name={choice.choiceValue}
                                    label="Câu trả lời..."
                                    variant="standard"
                                    disabled={status === 'now' || status === 'end' ? true : false}
                                />} />
                    ))}
                    {/* <FormControlLabel value="B" control={<Radio />} label={<TextField sx={{ mb: 3, width: "550px" }} onChange={handleChangeTextChoice} id="standard-basic" name='B' label="Câu trả lời..." variant="standard" />} />
                    <FormControlLabel value="C" control={<Radio />} label={<TextField sx={{ mb: 3, width: "550px" }} onChange={handleChangeTextChoice} id="standard-basic" name='C' label="Câu trả lời..." variant="standard" />} />
                    <FormControlLabel value="D" control={<Radio />} label={<TextField sx={{ mb: 3, width: "550px" }} onChange={handleChangeTextChoice} id="standard-basic" name='D' label="Câu trả lời..." variant="standard" />} /> */}

                </RadioGroup>
            </FormControl>
        </>
    )
}
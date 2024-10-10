import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function WritingTest({ handleChangeAnswer, answer }) {
    const [answerSaved, setAnswer] = React.useState(answer || '');

    // Update state when the `answer` prop changes
    React.useEffect(() => {
        if (answer) {
            setAnswer(JSON.parse(answer));
        }
    }, [answer]);
    return (
        <Box sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id="standard-multiline-static"
                label={answerSaved ? null : "Câu trả lời"}
                multiline
                rows={20}
                variant="outlined"
                value={answerSaved.answer}
                onChange={(e) => { setAnswer(e.target.value) }}
                onBlur={(e) => { handleChangeAnswer(e.target.value, null) }}
            />
        </Box>
    )
}

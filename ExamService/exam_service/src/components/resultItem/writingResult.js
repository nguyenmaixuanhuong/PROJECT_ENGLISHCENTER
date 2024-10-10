import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function WritingTest({ result }) {

    return (
        <Box sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id="standard-multiline-static"
                multiline
                rows={20}
                variant="outlined"
                value={result.userAnswer}
                focused={false}
            />
        </Box>
    )
}

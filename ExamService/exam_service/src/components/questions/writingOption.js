import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
export default function WritingOption() {
    return (
        <Box sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id="standard-multiline-static"
                label="Câu trả lời"
                multiline
                rows={6}
                disabled
                variant="outlined"
            // onChange={handleChange}
            />
        </Box>
    )
}
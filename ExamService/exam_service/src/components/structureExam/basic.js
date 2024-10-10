import * as React from 'react';
import Box from '@mui/material/Box';
import PartItem from './partItem';
import { useSelector } from 'react-redux';
export default function BasicStructure() {

    const part = useSelector((state) => state?.exam.part);
    return (
        <Box sx={{ maxWidth: 850, m: "auto" }} >
            {part && part.map((element) => (
                <PartItem element={element}></PartItem>
            ))}
        </Box>
    );
}

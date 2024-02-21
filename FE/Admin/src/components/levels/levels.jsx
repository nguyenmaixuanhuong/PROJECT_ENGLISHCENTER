import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useApp } from '../../context/AppProvider.js';
export default function Levels({levelSelected,onChangeLevel}) {
    const [level, setLevel] = React.useState(levelSelected);
    const { levels } = useApp()
    const handleChange = (event) => {
        const selectedLevel = event.target.value;
        setLevel(selectedLevel); // Cập nhật giá trị level
        onChangeLevel(selectedLevel); // Gọi hàm callback để truyền giá trị level lên component cha
    };
    return (
        <div>
            <FormControl  fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>             
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={levelSelected}
                    onChange={handleChange}
                    autoWidth
                    label='Level'
                    helperText='Level chưa được chọn'
                >
                    {levels && levels.map((level) => (                 
                            <MenuItem key={level._id}  value={level._id}>{level.name}</MenuItem>                         
                    ))}
                </Select>   
            </FormControl>
        </div>
    );
}
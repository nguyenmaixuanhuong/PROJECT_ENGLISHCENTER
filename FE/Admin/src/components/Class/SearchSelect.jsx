import * as React from 'react';
import Select from 'react-select';
import { useState } from 'react';


export default function SearchStudent(props) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        props.onChangeSelect(selectedOptions);
    };
    const customStyles = {
        input: (provided) => ({
            ...provided,
            borderRadius: '4px',
            padding: '10px',
            width: '200px',
            outline: 'none',
        }),
        // Tùy chỉnh styles khác nếu cần
    };
    return (
        <div className='mt-1 mb-3'>
            <Select
                placeholder={props.isTeacher ? 'Thêm giáo viên.. ' : 'Thêm học sinh..'}
                isMulti
                options={props.data}
                styles={customStyles}
                onChange={handleChange}
            />
        </div>
    )

}
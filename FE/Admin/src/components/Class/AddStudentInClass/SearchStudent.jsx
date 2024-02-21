import * as React from 'react';
import './ListAirPort.style.scss'
import Select from 'react-select';
export default function SearchStudent() {
    const airports = [
        { value: 'Cần Thơ',  label: 'Cần Thơ' },
        { value: 'Hồ Chí Minh',  label: 'Hồ Chí Minh' },
        { value: 'Nội Bài',  label: 'Nội Bài' },
        { value: 'Nha Trang',  label: 'Nha Trang' },
        { value: 'Cam Ranh',  label: 'Cam Ranh' },

    ]
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
        <div>
            <Select options={airports} styles={customStyles} />
        </div>
    )

}
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({onChangeImage}) {
    const [image, setImage] = React.useState()
    const handleChangeImage = function(e){
        const imagenew = e.target.files[0];
        setImage(imagenew)
        onChangeImage(imagenew)
    }    
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Ảnh
      <VisuallyHiddenInput type="file"
      onChange={handleChangeImage}
      />
    </Button>
  );
}

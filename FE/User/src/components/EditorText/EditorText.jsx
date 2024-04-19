import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import UploadIcon from '@mui/icons-material/Upload';
import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { uploadFile, deleteFiles } from '../../Context/uploadFile';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './EditorText.style.scss';
import { createNews, updateNews } from '../../services/information';
import Document from '../Class/Document/Document';
import LinearProgress from '@mui/material/LinearProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
function EditorText({ handleClose, handleCloseModal, information, idclass, iduser, renderNews, createExercises,handleChangeContent }) {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');
    const [listLinkSelected, setListLinkSelected] = useState([]);
    const [link, setLink] = useState('')
    const quillRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleCloseModalLink = () => setOpen(false);


    useEffect(() => {
        setText(information ? information.note : '');
        setListLinkSelected(information ? information.links : [])
        setFiles(information ? information.documents : []);
    }, [information])

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setLoading(true);
        selectedFiles.forEach(async file => {
            const fileUpload = await uploadFile(file, 'document')
            const urlFile = {
                name: file.name,
                ...fileUpload
            }
            setFiles((preFiles) => [...preFiles, urlFile]);
            setLoading(false);
        });
    };

    const handleRemoveFiles = async (file) => {
        deleteFiles(file.publicId)
        setFiles((preFiles) =>
            preFiles.filter((prefile) => prefile !== file)
        );
    }
    const handleGetText = () => {
        const valueText = quillRef.current.getEditor().getLength();
        setValue(valueText);
    };

    const handleChangeLink = (e) => {
        const link = e.target.value;
        setLink(link);    
    }
    const handleRemoveLink = (link) => {
        setListLinkSelected((preLinks) =>
            preLinks.filter((prelink) => prelink !== link)
        );
    }

    const handleSubmitLink = () => {
        setListLinkSelected((preLink) => [...preLink, link]);
        setLink('')
        
        handleCloseModalLink();

    };


    useEffect(() => {
        handleGetText();
        if(handleChangeContent){
            handleChangeContent('links',listLinkSelected);
            handleChangeContent('documents',files);
            handleChangeContent('description', quillRef.current.getEditor().root.innerHTML);
        }
    }, [text,files,listLinkSelected])

    const handleSaveNews = async () => {
        const news = {
            class: idclass,
            teacher: iduser,
            note: text,
            links: listLinkSelected,
            documents: files
        }

        if (await createNews(news)) {
            handleClose();
            renderNews();
        }
        else {
            alert('Đã có lỗi xảy ra')
        }
    }

    const handleUpdateNews = async () => {
        const inforUpdate = {
            note: text,
            links: listLinkSelected,
            documents: files
        }
        if (await updateNews(information._id, inforUpdate)) {
            handleCloseModal();
            renderNews();
        }
        else {
            alert('Đã có lỗi xảy ra')
        }
    }
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet', 'indent',
    ]

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

    return <div className="mt-3 editor-news">
        <div className="editor-text">
            <ReactQuill theme="snow"
                style={{ height: 150 }}
                modules={modules}
                formats={formats}
                value={text}
                onChange={setText}
                ref={quillRef}
            />;
        </div>

        {loading ? <div className="listfiles">  <LinearProgress /></div> : ''}
        <div className="listfiles">
            {files && files.map((file) => (
                <div className="file-item">
                    <Document file={file}></Document>
                    <IconButton onClick={() => handleRemoveFiles(file)}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
            ))}
        </div>
        <div className="listlink">
            {listLinkSelected && listLinkSelected.map((link) => (
                <div className="link-item">
                    <a href={link} target='_blank' rel='noopener noreferrer'>{link}</a>
                    <IconButton sx={{ ml: 2, height: 'min-content' }} onClick={() => handleRemoveLink(link)}>
                        <HighlightOffIcon />
                    </IconButton>
                </div>
            ))}
        </div>
        <div className="upload-link">
            <Stack direction="row" spacing={1}>
                <div className="uploadfile">
                    <Button
                        style={{ border: '1px solid rgb(226, 226, 226)', paddingBottom: '10px', marginRight: 10, borderRadius: 50 }}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                    >
                        <UploadIcon />
                        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                    </Button>
                </div>
                <div className="modal-link">
                    <IconButton onClick={handleOpen} style={{ border: '1px solid rgb(226, 226, 226)', paddingLeft: '20px', paddingRight: '20px', borderRadius: 50 }} aria-label="delete" color="primary">
                        <LinkIcon />
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleCloseModalLink}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography sx={{ mb: 3, textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
                                Thêm đường liên kết
                            </Typography>
                            <TextField
                                value={link}
                                onChange={handleChangeLink}
                                fullWidth
                                id="filled-basic"
                                label="Thêm đường liên kết"
                                variant="filled" />
                            <div className="mt-3 ">
                                <Stack sx={{ float: 'right' }} spacing={2} direction="row">
                                    <Button variant="text" onClick={handleCloseModalLink}>Hủy</Button>
                                    <Button
                                        onClick={handleSubmitLink}
                                        variant="contained"
                                        disabled={link ? false : true}>
                                        Thêm đường liên kết
                                    </Button>
                                </Stack>

                            </div>
                        </Box>
                    </Modal>
                </div>
            </Stack>
            {createExercises ? " "
                :
                <div className="">
                    {information ?
                        <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={handleCloseModal}>Hủy</Button>
                            <Button
                                onClick={handleUpdateNews}
                                variant="contained"
                                disabled={value > 1 ? false : true}>
                                Cập nhật
                            </Button>
                        </Stack>
                        :
                        <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={handleClose}>Hủy</Button>
                            <Button
                                onClick={handleSaveNews}
                                variant="contained"
                                disabled={value > 1 ? false : true}>
                                Đăng Tin
                            </Button>
                        </Stack>
                    }
                </div>
            }
        </div>
    </div>

}

export default EditorText;
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getAssignment } from '../../../services/assignments.api';
import { useState } from 'react';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Document from '../Document/Document';
import { Link } from 'react-router-dom';
import { uploadFile, deleteFiles } from '../../../Context/uploadFile';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { submitAssignment, unSubmitAssignment, markScore } from '../../../services/assignments.api';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
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
function DetailAssignment() {
    const { id } = useParams();
    const role = useSelector((state) => state.user?.role)
    const user = useSelector((state) => state.user?.user)
    const [assignment, setAssignment] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [files, setFiles] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [render, setRender] = useState(false);
    const [submitScore, setSubmitScore] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    React.useEffect(() => {
        async function fetchAssignment() {
            const assignment = await getAssignment(id);
            setAssignment(assignment);
            if (assignment) {
                const studentSubmit = assignment.submmits.find(item => item.student?._id === user?._id);
                if (studentSubmit) {
                    setFiles(studentSubmit.assignments);
                    setSubmit(true);
                    setSubmitScore(studentSubmit.score);
                }
            }
        }
        fetchAssignment();
    }, [id, user, render])
    const handleChangeScore = (e) => {
        const score = e.target.value
        if (score <= 0) {
            setScore(0)
        }
        else {

            setScore(score);
        }
    }

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

    const handleSubmit = () => {
        const assignment = {
            student: user?._id,
            assignments: files
        }
        if (submitAssignment(id, assignment)) {
            setSubmit(true);
        }
    }

    const handleUnSubmit = () => {
        if (unSubmitAssignment(id, user?._id)) {
            setSubmit(false);
            // setFiles([]);
        }
    }

    const handleMarkScore = (iduser) => {
        if (markScore(id, iduser, score)) {
            handleClose();
            setRender(!render)
        }
        else {
            alert('Đã có lỗi xảy ra')
        }
    }
    return (
        <div className="assigment-detail container">
            <Grid container>
                {role === 'Student' ?
                    <Grid item md={3} sm={12} sx={{ width: 'inherit' }}>
                        <div className="assignment-body_left">
                            <Typography variant="h6" component="h2" textAlign={'center'}>
                                Bài tập của bạn
                            </Typography>
                            {submitScore ?
                            <div className="d-flex justify-content-between mb-2">
                                <Typography variant="body1" component="h2" >
                                   Đã chấm điểm:  
                                </Typography>
                                <Typography variant="body1" component="h2" sx={{fontWeight: 600}} >
                                    {submitScore}/{assignment.score}
                                </Typography>
                            </div>
                                : <Typography variant="body1" component="h2" textAlign={'center'} >
                                    Chưa chấm điểm
                                </Typography>
                            }
                            {loading ? <LinearProgress /> :
                                files.map((file) => {
                                    return <div className="file-item " style={{ position: 'relative' }}>
                                        <Link className='text-direction_none' to={{ pathname: '/document', search: `?url=${file.url}` }}>
                                            <Document file={file}></Document>
                                        </Link>
                                        {submit ? '' :
                                            <IconButton sx={{ position: 'absolute', top: '0px', right: '0px', zIndex: '1000' }} onClick={() => handleRemoveFiles(file)}>
                                                <HighlightOffIcon />
                                            </IconButton>
                                        }
                                    </div>
                                })
                            }
                            {submit
                                ? <Button 
                                variant='outlined' sx={{ mt: 3 }} 
                                onClick={handleUnSubmit} 
                                disabled = {submitScore ? true : false}
                                >Hủy nộp bài</Button>
                                : <div >
                                    <Button
                                        fullWidth
                                        style={{ border: '1px solid rgb(226, 226, 226)', textTransform: 'capitalize', marginRight: 10, marginTop: 20, padding: 15, }}
                                        component="label"
                                        role={undefined}
                                        tabIndex={-1}

                                    >
                                        <NoteAddIcon sx={{ mr: 1 }} />
                                        Nộp bài tập tại đây
                                        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                                    </Button>
                                    <Button fullWidth variant='contained' sx={{ mt: 3 }} onClick={handleSubmit}>Nộp bài</Button>
                                </div>
                            }
                        </div>
                    </Grid>
                    : <Grid item md={3} sm={12} sx={{ width: 'inherit' }}>
                        <div className="assignment-body_left">
                            <Typography variant="h6" component="h2" textAlign={'center'}>
                                Danh sách nộp bài
                            </Typography>
                            {assignment?.submmits.map((item) => {
                                return <div className='submit-item'>
                                    <div>
                                        <Typography variant="body1" component="h2">
                                            {item.student?.fullName}
                                        </Typography>
                                        <Typography variant="caption" component="h2" >
                                            Đã nộp: {new Date(item?.timeSubmitted).toLocaleDateString()}
                                        </Typography>
                                        {item.score ?
                                            <Typography variant="caption" component="h2" textAlign={'end'}>
                                                Đã chấm điểm: {item.score}/{assignment.score}
                                            </Typography>
                                            : ''
                                        }
                                    </div>
                                    <IconButton onClick={handleOpen}> <AssignmentIcon color='info' /></IconButton>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" sx={{ fontWeight: 500, textTransform: 'uppercase', color: 'goldenrod' }} variant="h5" component="h2" textAlign={'center'}>
                                                {assignment?.title}
                                            </Typography>
                                            <Divider></Divider>
                                            <Grid container sx={{ mt: 2 }}>
                                                <Grid item md={6} sm={12} sx={{ width: 'inherit' }}>
                                                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                                        Học viên: {item.student?.fullName}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                                        Ngày nộp vào: {new Date(item?.timeSubmitted).toLocaleDateString()}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 1, fontWeight: 700 }}>
                                                        Nội dung nộp
                                                    </Typography>
                                                    {item.assignments.map((assignment) => (
                                                        <Link className='text-direction_none' to={{ pathname: '/document', search: `?url=${assignment.url}` }}>
                                                            <Document file={assignment}></Document>
                                                        </Link>
                                                    ))}
                                                </Grid>
                                                <Grid item md={6} sm={12} sx={{ width: 'inherit' }}>
                                                    <div className="mark">
                                                        <Typography id="modal-modal-description" sx={{ mb: 1, fontWeight: 700 }} textAlign={'center'}>
                                                            Chấm Điểm
                                                        </Typography>
                                                        <TextField
                                                            type='Number'
                                                            value={score ? score : item.score}
                                                            onChange={handleChangeScore}
                                                            fullWidth
                                                            variant='filled'
                                                            label='Điểm'>
                                                        </TextField>
                                                        <Button variant='contained' fullWidth sx={{ mt: 1 }} onClick={() => { handleMarkScore(item.student._id) }}>Lưu điểm</Button>
                                                    </div>
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    </Modal>
                                </div>
                            })}
                        </div>
                    </Grid>
                }
                <Grid item md={9} sm={12} sx={{ width: 'inherit' }}>
                    <div className="assignment-body_right">
                        <Typography variant="h4" component="h2" color={'goldenrod'} sx={{ textTransform: 'uppercase' }}>
                            {assignment?.title}
                        </Typography>
                        <Typography variant="body2" component="h2" color={'grey'}>
                            Giáo viên: {assignment?.teacher.fullName}
                        </Typography>
                        <Typography variant="body2" component="h2" color={'grey'}>
                            Đã đăng vào: {new Date(assignment?.date).toLocaleDateString()}
                        </Typography>
                        <div className="d-flex justify-content-between assignment-header">
                            <Typography variant="body1" component="h2" color={'grey'} sx={{ fontWeight: ' 600' }}>
                                Điểm: {assignment?.score}
                            </Typography>
                            <Typography variant="body1" component="h2" color={'grey'} sx={{ fontWeight: ' 600' }}>
                                Ngày đến hạn: {new Date(assignment?.dueDate).toLocaleDateString()}
                            </Typography>
                        </div>
                        <div className="assignment-body">
                            <div className="text mt-3">
                                <h5>Hướng dẫn:</h5>
                                <div className='description' dangerouslySetInnerHTML={{ __html: assignment?.content?.description }} />
                            </div>
                            <div className="list-document">
                                {assignment?.content?.documents ?
                                    assignment?.content?.documents.map((document) => (
                                        <Link className='text-direction_none' to={{ pathname: '/document', search: `?url=${document.url}` }}>
                                            <Document file={document}></Document>
                                        </Link>
                                    ))
                                    : ''
                                }
                            </div>
                            <div className="infor-links">
                                {assignment?.content?.links ?
                                    assignment?.content?.links.map((link) => (
                                        <div className="link-item">
                                            <a href={link} target='_blank' rel='noopener noreferrer'>{link}</a>
                                        </div>
                                    ))
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default DetailAssignment;
import * as React from 'react';
import { useSelector } from "react-redux";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import './Exercise.style.scss'
import EditorText from '../../EditorText/EditorText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AssignmentIcon from '@mui/icons-material/Assignment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Document from '../Document/Document';
import { Link } from 'react-router-dom';
import { createAssignment, listAllAssignment, listAssignmentsWithTeacher } from '../../../services/assignments.api';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    overflow: 'auto',
    p: 3
};

function Exercise({ classCurrent }) {
    const role = useSelector((state) => state.user?.role)
    const user = useSelector((state) => state.user?.user)
    const [open, setOpen] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [dueDate, setDueDate] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [render, setRender] = React.useState(false);
    const [content, setContent] = React.useState({
        description: '',
        links: [],
        documents: [],
    })

    const [listAssignments, setListAssignments] = React.useState([]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleScore = (e) => {
        const score = e.target.value;
        if (score <= 0) {
            setScore(0)
        }
        else {
            setScore(score);
        }
    }

    const handleChangeContent = React.useCallback((name, value) => {
        setContent(prevContent => ({ ...prevContent, [name]: value }));
    }, [])
    const handleTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };
    const handleDateChange = (date) => {
        setDueDate(date)
    }

    const handleCreateAssignment = () => {
        const assignment = {
            class: classCurrent?._id,
            teacher: user?._id,
            title: title,
            dueDate: dueDate,
            score: score,
            content: content
        }
        if (title.length <= 0) {
            alert('Vui lòng nhập chủ đề bài tập')
        }
        else {
            if (createAssignment(assignment)) {
                handleClose();
                setRender(!render);
            }
        }
    }

    React.useEffect(() => {
        async function fetchAssignment() {
            let listAssignments;
            if (role === 'Teacher') {
                listAssignments = await listAssignmentsWithTeacher(classCurrent?._id, user?._id)
            }
            else {
                listAssignments = await listAllAssignment(classCurrent?._id);
            }
            setListAssignments(listAssignments)
        }
        fetchAssignment();
    }, [render]);

    return (
        <div className="exercise">
            <div className="exercise-create">
                <div className="title-news">
                    <h3>BÀI TẬP</h3>
                    {role === 'Teacher' ?
                        <div>
                            <Button variant='contained' sx={{ marginBottom: 2 }} onClick={handleOpen}><PostAddIcon />THÊM BÀI TẬP MỚI</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="exercise-content">
                                        <div className='d-flex'>
                                            <IconButton sx={{ mr: 2, alignSelf: 'center' }}>
                                                <CloseIcon onClick={handleClose} />
                                            </IconButton>
                                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                                Bài tập
                                            </Typography>
                                        </div>
                                        <Button variant='contained' onClick={handleCreateAssignment}>Giao Bài</Button>
                                    </div>
                                    <Divider></Divider>
                                    <div className="container">
                                        <Grid container>
                                            <Grid item md={3} sm={12} sx={{ width: 'inherit' }}>
                                                <div className="exercise-body_left">
                                                    <Typography variant="h6" component="h2" textAlign={'center'}>
                                                        Dành cho
                                                    </Typography>
                                                    <Typography variant="body1" component="h2" textAlign={'center'}>
                                                        Lớp: {classCurrent?.className}
                                                    </Typography>
                                                    <TextField value={score} onChange={handleScore} id="outlined-basic" label="Điểm" type='number' variant="outlined" sx={{ backgroundColor: 'white', mb: 3, mt: 3 }} />
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Hạn nộp"
                                                            name="dueDate"
                                                            value={dueDate}
                                                            format='DD/MM/YYYY'
                                                            onChange={handleDateChange}
                                                            renderInput={(params) => <TextField sx={{ backgroundColor: 'white' }} variant="outlined" {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </Grid>
                                            <Grid sx={{ padding: 0 }} item sm={12} md={9}>
                                                <div className="exercise-body_right">
                                                    <TextField onChange={handleTitle} value={title} fullWidth id="outlined-basic" label="Tiêu đề" variant="outlined" sx={{ backgroundColor: 'white', boxShadow: '2px 2px 10px rgb(203, 203, 203)' }} />
                                                    <EditorText handleChangeContent={handleChangeContent} createExercises={true}></EditorText>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                        : ''
                    }
                </div>
                <div className="list-assignment">
                    {listAssignments && listAssignments.map((assignment) => (
                        <div className="assigment">
                            <Accordion sx={{ width: '-webkit-fill-available' }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <div className="assignment-item">
                                        <p className='title'> <AssignmentIcon color='info' /> {assignment.title}</p>
                                        <Typography variant='caption'>Đã đăng: {new Date(assignment.date).toLocaleDateString()}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <div style={{ width: '100%' }}>
                                    <div className="text ">
                                            <h6>Giáo viên: {assignment.teacher?.fullName}</h6>
                                        </div>
                                        <div className="text ">
                                            <h6>Thời hạn nộp: {new Date(assignment.dueDate).toLocaleDateString()}</h6>
                                        </div>
                                        <div className="text ">
                                            <h6>Hướng dẫn:</h6>
                                            <div className='description' dangerouslySetInnerHTML={{ __html: assignment.content?.description }} />
                                        </div>
                                        <div className="list-document">
                                            {assignment.content?.documents ?
                                                assignment.content?.documents.map((document) => (
                                                    <Link to={{ pathname: '/document', search: `?url=${document.url}` }}>
                                                        <Document file={document}></Document>
                                                    </Link>
                                                ))
                                                : ''
                                            }
                                        </div>
                                        <div className="infor-links">
                                            {assignment.content?.links ?
                                                assignment.content?.links.map((link) => (
                                                    <div className="link-item">
                                                        <a href={link} target='_blank' rel='noopener noreferrer'>{link}</a>
                                                    </div>
                                                ))
                                                : ''
                                            }
                                        </div>
                                        <Link to={`/assignment/${assignment._id}`}>
                                            <Button variant='outlined' sx={{ float: 'right', m: 2 }}>Xem chi tiết</Button>
                                        </Link>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default Exercise;
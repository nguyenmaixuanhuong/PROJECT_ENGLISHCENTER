import { useEffect, useState } from 'react';
import * as React from 'react';
import EditorText from '../../EditorText/EditorText';
import UpdateEditorText from '../../EditorText/UpdateEditorText';
import './NewsClass.style.scss'
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Document from '../Document/Document';
import { listInformation, deleteNews } from '../../../services/information';
import { Divider, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
function NewsClass({ classCurrent }) {
    const role = useSelector((state) => state.user?.role)
    const user = useSelector((state) => state.user?.user)
    const [informations, setInformations] = useState([])
    const [render, setRender] = useState(false);
    const [comments, setComments] = useState([]);

    const handleChangeComment = (index, value) => {
        const newComments = [...comments];
        newComments[index] = value;
        setComments(newComments);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openOptions = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptions = () => {
        setAnchorEl(null);
    };
    const renderNews = () => {
        setRender(!render)
    }

    const handleDeleteNews = async (id) => {
        try {
            await deleteNews(id, classCurrent?._id)
            handleCloseOptions();
            setRender(!render);
        } catch (error) {
            alert('Đã có lỗi xảy ra')
        }
    }

    useEffect(() => {
        async function fetchData() {
            const list = await listInformation(classCurrent?._id);
            setInformations(list);
        }
        fetchData();
    }, [render, classCurrent])
    return (
        <div className="newsclass">
            <div className="poster-class">
                <h1>{classCurrent?.className}</h1>
            </div>
            <div className="">
                <div className="title-news">
                    <h3>BẢNG TIN</h3>
                    {role === 'Teacher' ?
                        <Button onClick={handleOpen} variant='contained' sx={{ marginBottom: 2 }}>ĐĂNG TIN</Button>
                        : ''
                    }
                </div>
                {open ?
                    <EditorText handleClose={handleClose} renderNews={renderNews} idclass={classCurrent?._id} iduser={user?._id} />
                    : ''}
                <div className="">
                    {informations && informations.map(( information, index) => (
                        <div className="infor-item">
                            <div className="infor-user">
                                <div className="user d-flex">
                                    <Avatar sx={{ mr: 2 }} alt="" src={`${information.teacher.account.avatar?.url}`} />
                                    <div >
                                        <h5 >{information.teacher.fullName}</h5>
                                        <p>{new Date(information.date).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </div>
                                {role === 'Teacher' ?
                                    <div>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={openOptions ? 'long-menu' : undefined}
                                            aria-expanded={openOptions ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={openOptions}
                                            onClose={handleCloseOptions}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 150,
                                                    width: '15ch',
                                                },
                                            }}
                                        >
                                            <MenuItem >
                                                <UpdateEditorText information={information} renderNews={renderNews}></UpdateEditorText>
                                            </MenuItem>
                                            <MenuItem onClick={() => { handleDeleteNews(information._id) }}>
                                                <Button>
                                                    Xóa bài đăng
                                                </Button>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    : ''}
                            </div>
                            <div className="text px-4">
                                <div dangerouslySetInnerHTML={{ __html: information.note }} />
                            </div>
                            <div className="list-document">
                                {information.documents ?
                                    information.documents.map((document) => (
                                        <Link to={{ pathname: '/document', search: `?url=${document.url}` }}>
                                            <Document file={document}></Document>
                                        </Link>
                                    ))
                                    : ''
                                }
                            </div>
                            <div className="infor-links">
                                {information.links ?
                                    information.links.map((link) => (
                                        <div className="link-item">
                                            <a href={link} target='_blank' rel='noopener noreferrer'>{link}</a>
                                        </div>
                                    ))
                                    : ''
                                }
                            </div>
                            <Divider />
                            <div className="infor-comment">
                                <Avatar sx={{ ml: 1 }} alt="" src={`${user.account.avatar?.url}`} />
                                <TextField sx={{ borderRadius: 30 }}
                                    fullWidth
                                    size='small'
                                    className="input-comment"
                                    label="Thêm nhận xét cho lớp học..."
                                    variant="filled"
                                    value={comments[index]}
                                    onChange={(e) => handleChangeComment(index, e.target.value)}
                                    id={information._id}
                                />
                                {comments[index] ? <SendIcon color='primary' sx={{ ml: 2 }} /> : <SendIcon color='action' sx={{ ml: 2 }} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewsClass;
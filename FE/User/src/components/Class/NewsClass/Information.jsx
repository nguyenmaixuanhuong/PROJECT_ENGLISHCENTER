import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Document from '../Document/Document';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Divider, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UpdateEditorText from '../../EditorText/UpdateEditorText';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { addComment,deleteComment } from '../../../services/information';
function Information({ information, renderNews, role, handleDeleteNews, user }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [comment, setComment] = useState('');
    const [sucess, setSucess] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const openOptions = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleCloseOptions = () => {
        setAnchorEl(null);
    };
    const handleChangeComment = (value) => {
        setComment(value);
    };

    const handleAddComment = async () => {
        const newComment = {
            comment: comment,
            user: user?._id,
            userType: role,
            account: user.account?._id,
        }
        const resutl = await addComment(information?._id, newComment);
        if (resutl !== 200) {
            setSucess(false);
            handleOpen();
        }
        else {
            setComment('');
            renderNews();
        }
    }

    const handleDeleteComment = async (id) => {
        const resutl = await deleteComment(id);
        if (resutl !== 200) {
            setSucess(false);
            handleOpen();
        }
        else {
            renderNews();
        }
    }
    return (
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
                            id='long-menu'
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
                            <MenuItem onClick={() => {
                                handleCloseOptions();
                                handleDeleteNews(information._id);
                            }}>
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
            <div className="list-comment">
                {information && information.comments.map((item) => (
                    <div className="comment-item">
                        <div className="">
                            <Avatar sx={{ ml: 1 }} alt="" src={`${item.account.avatar?.url}`} />

                        </div>
                        <div className="comment-item_info">
                            <div className="d-flex justify-content-between">
                                <p className='nameUser'>{item.user?.fullName}</p>
                                {item.user._id === user._id ?                             
                                <Tooltip title="Xóa bình luận">
                                    <HighlightOffIcon color='info' fontSize='small' onClick={()=>{handleDeleteComment(item._id)}} />
                                </Tooltip>
                                : ''
                            }
                            </div>
                            <p className='date'>{new Date(item.date).toLocaleString()}</p>
                            <p className='comment-content'>{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="infor-comment">
                <Avatar sx={{ ml: 1 }} alt="" src={`${user.account.avatar?.url}`} />
                <TextField sx={{ borderRadius: 30 }}
                    fullWidth
                    size='small'
                    className="input-comment"
                    label="Thêm nhận xét cho lớp học..."
                    variant="filled"
                    value={comment}
                    onChange={(e) => handleChangeComment(e.target.value)}
                    id={information._id}
                />
                {comment ? <SendIcon onClick={() => {
                    handleAddComment();
                }} color='primary' sx={{ ml: 2 }} /> : <SendIcon color='action' sx={{ ml: 2 }} />}
            </div>
            {sucess ? '' :
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    >
                        Đã có lỗi xảy ra, vui lòng thử lại
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}

export default Information;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import './PersonInfor.style.scss'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { uploadFile, deleteFiles } from '../../../Context/uploadFile';
import { changeAvatar } from '../../../services/auth.api';
import { updateAvatar } from '../../../store/UserSlice'
import ChangePassword from './ModalChangePassword';
import ChangeInfor from './ModalChangeInfor';
function PersonInfor() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user)
    const role = useSelector((state) => state.user.role)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState(user.account?.avatar);
    const openOptions = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    const handleChangeImages = async (e) => {
        const imageSelected = e.target.files[0]
        setLoading(true);
        if (image) {
            await deleteFiles(image.publicId);
        }
        const imageUpload = await uploadFile(imageSelected, 'avatar')
        const urlImage = {
            name: imageSelected.name,
            ...imageUpload
        }
        setImage(urlImage);
        if (changeAvatar(user.account._id, urlImage)) {
            setLoading(false);
            dispatch(updateAvatar({ urlImage }))
        }
        else {
            alert('Đã có lỗi xảy ra, vui lòng thử lại');
        }
    }

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

    return (
        <div className="person-infor-container">
            <div>
                <div className='selections'>
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
                                width: '25ch',
                            },
                        }}
                    >
                        <MenuItem >           
                            <ChangeInfor user={user}  role={role} />
                        </MenuItem>
                        <MenuItem >
                            <ChangePassword user={user}></ChangePassword>
                        </MenuItem>
                    </Menu>
                </div>
                <h2 className='text-center text-danger'>THÔNG TIN CÁ NHÂN</h2>
            </div>
            <div className="person-infor">
                <div className="avatar-person">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <Button
                                style={{ borderRadius: 50 }}
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                            >
                                <EditIcon sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 40,
                                    padding: 1,
                                    border: '1px solid rgb(233, 233, 233)',
                                    backgroundColor: 'white'
                                }} />
                                <VisuallyHiddenInput type="file" onChange={handleChangeImages} />
                            </Button>
                        }
                    >
                        {loading ?
                            <Skeleton animation="wave" variant="circular" width={'15rem'} height={'15rem'} />
                            :
                            <Avatar className='avatar-image' alt={user.fullName} src={image ? image.url : ''} />
                        }
                    </Badge>
                </div>
                <div className="infor-container">

                    <div className="list-infor">
                        <div className="info-item d-flex">
                            {role === 'Teacher' ?
                                <h5 className='title'>Mã Giáo Viên:</h5>
                                :
                                <h5 className='title'>Mã Học Viên:</h5>

                            }
                            <p className='infor'>{user.account.username}</p>
                        </div>
                        <div className="info-item d-flex">
                            <h5 className='title'>Họ và tên:</h5>
                            <p className='infor'>{user.fullName}</p>
                        </div>
                        <div className="info-item d-flex">
                            <h5 className='title'>Ngày sinh:</h5>
                            <p className='infor'>{new Date(user.birthDay).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div className="info-item d-flex">
                            <h5 className='title'>Số điện thoại:</h5>
                            <p className='infor'>{user.phoneNumber}</p>
                        </div>
                        {role === 'Teacher' ?
                            <div className="info-item d-flex">
                                <h5 className='title'>Email:</h5>
                                <p className='infor'>{user.email}</p>
                            </div>
                            : 
                            <div className="info-item d-flex">
                                <h5 className='title'>Địa chỉ:</h5>
                                <p className='infor'>{user.address}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonInfor;
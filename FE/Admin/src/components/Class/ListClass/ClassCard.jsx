import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InforClass from '../ModalInforClass/InforClass'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ClassCard.styles.scss'
import { finishClass } from '../../../services/class.api';
import AddStudentInClass from '../AddStudentInClass/AddStudentInClass';
import AddTeacherInClass from '../AddTeacherInClass/AddTeacherInClass';
import { useApp } from '../../../context/AppProvider';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 50,
  p: 4,
};
export default function ClassCart(props) {
  const { formatDate } = useApp()
  const hasAttend = props.class.attendances?.length;
  const [isEnough, setIsEnough] = React.useState()
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnChor = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleCloseAnChor = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    if (hasAttend < props.class.course.numberSession) {
      setIsEnough(false)
      setOpen(true);
    }
    else {
      setIsEnough(true)
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);
  const finishedClass = async (e) => {
    e.preventDefault();
    await finishClass(props.class._id);
    props.loadClasses();
  }
  return (
    <Card className="class-card" sx={{ display: 'flex', minHeight: 230, minWidth: 350 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div className="d-flex justify-content-between">
            <Typography className='class_name' component="div" variant="h6" fontWeight={600} sx={{ alignSelf: 'center' }}>
              {props.class.className}
            </Typography>
            {!props.class.isFinish &&
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openAnChor ? 'long-menu' : undefined}
                  aria-expanded={openAnChor ? 'true' : undefined}
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
                  open={openAnChor}
                  onClose={handleCloseAnChor}
                  PaperProps={{
                    style: {
                      maxHeight: 80 * 4.5,
                      width: '200px',
                    },
                  }}
                >
                  <MenuItem>
                    <AddStudentInClass idclass={props.class._id}></AddStudentInClass>
                  </MenuItem>
                  <MenuItem >
                    <AddTeacherInClass idclass={props.class._id}></AddTeacherInClass>
                  </MenuItem>
                </Menu>
              </div>
            }
          </div>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Giáo viên giảng dạy: {props.class.teachers.length === 0 ? null : props.class.teachers[0].fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ngày bắt đầu: {formatDate(props.class.startDay)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ngày kết thúc: {formatDate(props.class.finishDay)}
          </Typography>
          {!props.class.isFinish ?
            <div>
              {new Date(props.class.startDay) < new Date() ?
                <Typography variant="subtitle1" color="green" component="div">
                  Đang diễn ra: {hasAttend}/{props.class.course.numberSession} buổi
                </Typography>
                :
                <Typography variant="subtitle1" color="green" component="div">
                  Sắp diễn ra...
                </Typography>
              }

              <div className='d-flex justify-content-between pt-1'>
                <InforClass class={props.class} loadClasses={props.loadClasses}></InforClass>
                <div>
                  <Button onClick={handleOpen} sx={{ fontWeight: 700 }} variant='text' color='error'>
                    <DoDisturbOnIcon fontSize='small'></DoDisturbOnIcon>
                    Kết Thúc</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {isEnough ?
                        <div className='text-center'>
                          <Typography id="modal-modal-title" sx={{ marginBottom: 2 }} variant="subtitle1" color='red' component="h2">
                            Bạn có chắc là muốn kết thúc lớp học không ?
                          </Typography>
                          <Button onClick={finishedClass} variant='contained' sx={{ marginRight: 2, paddingX: 4 }}>Có</Button>
                          <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                        </div>
                        :
                        <Typography id="modal-modal-title" sx={{ textAlign: 'center' }} variant="body2" color='red' component="h2">
                          Bạn không thể kết thúc lớp học khi chưa đủ số buổi!!
                        </Typography>
                      }
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
            : <Typography variant="subtitle1" color="red" sx={{ textAlign: 'center', marginTop: '50px' }} component="div">
              ĐÃ KẾT THÚC
            </Typography>
          }

        </CardContent>
      </Box>
    </Card>
  );
}

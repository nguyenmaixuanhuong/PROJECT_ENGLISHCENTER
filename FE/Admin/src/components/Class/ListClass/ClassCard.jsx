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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function ClassCart(props) {
  const hasAttend = 20;
  const [isEnough, setIsEnough] = React.useState()
  const [open, setOpen] = React.useState(false);
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
    <Card className="class-card" sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div className="d-flex justify-content-between">
            <Typography component="div" variant="h5" sx={{ alignSelf: 'center'}}>
              {props.class.className}
            </Typography>
            <AddStudentInClass></AddStudentInClass>
          </div>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Giáo viên giảng dạy: {props.class.teacher?.fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ngày bắt đầu: {props.class.startDay}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ngày kết thúc: {props.class.finishDay}
          </Typography>
          {!props.class.isFinish ?
            <div>
              <Typography variant="subtitle1" color="green" component="div">
                Đang diễn ra: 0/{props.class.course.numberSession} buổi
              </Typography>
              <div className='d-flex justify-content-between'>
                <InforClass class={props.class} loadClasses={props.loadClasses}></InforClass>
                <div>
                  <Button onClick={handleOpen} variant='contained' color='error'>Kết Thúc</Button>
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
            : <Typography variant="subtitle1" color="red" sx={{ textAlign: 'center' }} component="div">
              ĐÃ KẾT THÚC
            </Typography>
          }

        </CardContent>
      </Box>
    </Card>
  );
}

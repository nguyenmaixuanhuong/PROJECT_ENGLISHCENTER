import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'
import './CardClass.style.scss';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import {useDispatch} from 'react-redux';
import { removeNotify } from '../../../store/NotifiySlice';
export default function CardClass(props) {
  const dispatch = useDispatch();
  const clearNotify = ()=>{
    dispatch(removeNotify());
  }
  return (
    <Link className='text-direction_none' to={`/class/${props.class._id}`} onClick={clearNotify}>
      <Card sx={{ maxWidth: 320, height: 300, mr: 5, mb: 5, borderRadius: 2 }}>
        <CardActionArea >
          <div className="cart-content">
            <CardContent>
              <h5 className='className' >{props.class.className}</h5>
            </CardContent>
          </div>
          <div className="cart-detail">
            <div className='date-class'>
              <p><AlarmOnIcon fontSize='small' color='success'/> Ngày bắt đầu: {new Date(props.class.startDay).toLocaleDateString('vi-VN')}</p>
              <p> <AlarmOnIcon fontSize='small' color='error'/> Ngày kết thúc: {new Date(props.class.finishDay).toLocaleDateString('vi-VN')}</p>
            </div>
            <p className='numberSession'>Số buổi đã diễn ra: {props.class.attendances?.length}</p>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}
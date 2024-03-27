import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import './style.scss'
export default function CourseCard(props) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300, }}>
      <CardMedia
        sx={{ height: '10rem' }}
        image={props.course.image}
        title="green iguana"
      />
      <CardContent sx={{paddingBottom: 0}}>
        <Typography className='course-name' gutterBottom variant="h6" component="div">
          {props.course.courseName} 

        </Typography>
        <Typography variant="body2" color="text.secondary">
        ({props.course.category})
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {
            new Intl.NumberFormat()
              .format(props.course.fee)
              .replaceAll(",", ".")
          }
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent:'space-around',fontWeight: 700}}>
        <Link to={`/updatecourse/${props.course._id}`}>
          <Button sx={{fontWeight: 700}} variant='text' >
            <EditIcon fontSize='small'></EditIcon>Cập nhật</Button>
        </Link>
        <Link to={`/classes/${props.course._id}`}>
          <Button sx={{fontWeight: 700}} variant='text' color='error' >
            <SchoolIcon fontSize='small'></SchoolIcon>
            Lớp Học</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

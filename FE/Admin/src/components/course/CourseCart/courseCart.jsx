import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
export default function CourseCard(props) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia
        sx={{ height: '10rem' }}
        image={props.course.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
      <CardActions>
        <Link to={`/updatecourse/${props.course._id}`}>
          <Button size="small">Cập nhật</Button>
        </Link>
        <Link to={`/classes/${props.course._id}`}>
          <Button size="small">Lớp Học</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

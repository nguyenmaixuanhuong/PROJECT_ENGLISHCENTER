import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './coursecart.style.scss';
export default function CourseCard(props) {
  return (
    <Card className='course-cart'  sx={{ maxWidth: 600, minWidth: 400,  }}>
      <CardMedia
        sx={{ height: '20rem' }}
        image={props.course.image}
        title="green iguana"
      />
      <CardContent sx={{paddingBottom: 0}}>
        <Typography sx={{textAlign:'center'}} gutterBottom variant="h5" component="div">
          {props.course.courseName} 
        </Typography>
        <Typography sx={{textAlign:'center'}} gutterBottom variant="h6" component="div">
          {
            new Intl.NumberFormat()
              .format(props.course.fee)
              .replaceAll(",", ".")
          }
        </Typography>
      </CardContent>
    </Card>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
export default function CardTeacher({ teacher }) {
    return (
        <Card sx={{ maxWidth: 345 ,borderRadius:5, border: "5px solid white"}}>
            <CardActionArea>
                <CardContent className='card-container' sx={{ height: 320 }}>
                    <div className="card-content">
                        <div className="card-header">
                            <Avatar
                                alt="Remy Sharp"
                                src={teacher.account.avatar?.url}
                                sx={{ width: 150, height: 150 }}
                            />
                            <div className="card-infor">
                                <Typography variant='h5' fontWeight={500}>{teacher.fullName}</Typography>
                                <Typography variant='body2' sx={{textAlign:'center'}}>Level: {teacher.level?.name}</Typography>
                            </div>
                        </div>
                        <p className='card-maxim'>"Chúng tôi luôn tận tâm giảng dạy và cống hiến hết mình"</p>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
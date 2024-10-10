import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
export default function CardTeacher({ teacher }) {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: "2px 2px 5px grey" }}>
            <CardActionArea>
                <CardContent className='card-container' >
                    <div className="card-content">
                        <div className="card-header">
                            <Avatar
                                alt="Remy Sharp"
                                src={teacher.account.avatar?.url}
                                sx={{ width: 100, height: 100 }}
                            />
                            <div className="card-infor">
                                <Typography variant='h5' textAlign={'center'} fontWeight={500}>{teacher.fullName}</Typography>
                                <Typography variant='body2' sx={{ textAlign: 'center' }}>Level: {teacher.level?.name}</Typography>
                                <p className='card-maxim'>"Chúng tôi luôn tận tâm giảng dạy và cống hiến hết mình"</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
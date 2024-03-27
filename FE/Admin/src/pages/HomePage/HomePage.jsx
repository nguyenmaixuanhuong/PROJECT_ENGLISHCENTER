import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../context/useAuthCheck';
import { overview } from '../../services/login.api';
import './HomePage.style.scss'
import { Link } from 'react-router-dom';
function HomePage() {
    useAuthCheck();
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            const data = await overview();
            setData(data);
        }
        fetchData();
    }, []);
    return (
        <div className="home-container">
            <Link className="overview-item" to='/register'>
                <Card className=" overview-register" sx={{ display: 'flex', width: 250, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', ml: 5 }}>
                            <Typography variant="h3" color="white" sx={{ textAlign: 'center' }} component="div">
                                {data?.numberRegister}
                            </Typography>
                            <Typography component="div" color="white" variant="body2">
                                Số người đăng kí
                            </Typography>

                        </CardContent>
                    </Box>
                </Card>
            </Link>
            <Link className="overview-item" to='/student'>
                <Card className="  overview-student" sx={{ display: 'flex', width: 250 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', ml: 5 }}>
                            <Typography variant="h3" color="white" sx={{ textAlign: 'center' }} component="div">
                                {data?.numberStudent}
                            </Typography>
                            <Typography component="div" color="white" variant="body2">
                                Tổng số học viên
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Link>
            <Link className="overview-item" to='/teachers'>
                <Card className=" overview-teacher" sx={{ display: 'flex', width: 250 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', ml: 5 }}>
                            <Typography variant="h3" color="white" sx={{ textAlign: 'center' }} component="div">
                                {data?.numberTeacher}
                            </Typography>
                            <Typography component="div" color="white" variant="body2">
                                Tổng số giáo viên
                            </Typography>
                        </CardContent>
                    </Box>

                </Card>
            </Link>
            <Link className="overview-item" to='/classes/all'>      
            <Card className=" overview-class" sx={{ display: 'flex', width: 250 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', ml: 5 }}>
                        <Typography variant="h3" color="white" sx={{ textAlign: 'center' }} component="div">
                            {data?.numberClass}
                        </Typography>
                        <Typography component="div" color="white" variant="body2">
                            Tổng số lớp diễn ra
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            </Link>

        </div>
    )
}

export default HomePage;
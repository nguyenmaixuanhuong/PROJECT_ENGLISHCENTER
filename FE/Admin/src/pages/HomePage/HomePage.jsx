import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupsIcon from '@mui/icons-material/Groups';
import Groups2Icon from '@mui/icons-material/Groups2';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../context/useAuthCheck';
import { overview } from '../../services/login.api';
import './HomePage.style.scss'
import { Link } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
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

    console.log(data?.dataSet);
    return (
        <div className="home-container">
            <div className="overview">
                <Link className="overview-item" to='/register'>
                    <Card className=" overview-register" sx={{ display: 'flex', width: 250, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CardContent sx={{ ml: 2 }}>
                                <Typography component="div" color="red" variant="body2">
                                    Số người đăng kí
                                </Typography>
                                <Typography variant="h4" color="dark" component="div">
                                    {data?.numberRegister}
                                </Typography>
                            </CardContent>
                            <HowToRegIcon fontSize='large' color='disabled' sx={{ alignSelf: 'center', mr: 3 }}></HowToRegIcon>
                        </Box>
                    </Card>
                </Link>
                <Link className="overview-item" to='/student'>
                    <Card className="  overview-student" sx={{ display: 'flex', width: 250 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto', ml: 2 }}>
                                <Typography component="div" color="green" variant="body2">
                                    Tổng số học viên
                                </Typography>
                                <Typography variant="h4" color="dark" component="div">
                                    {data?.numberStudent}
                                </Typography>
                            </CardContent>
                            <GroupsIcon fontSize='large' color='disabled' sx={{ alignSelf: 'center', mr: 3 }}></GroupsIcon>
                        </Box>
                    </Card>
                </Link>
                <Link className="overview-item" to='/teachers'>
                    <Card className=" overview-teacher" sx={{ display: 'flex', width: 250 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto', ml: 2 }}>
                                <Typography component="div" color="rgb(35, 169, 210)" variant="body2">
                                    Tổng số giáo viên
                                </Typography>
                                <Typography variant="h4" color="dark" component="div">
                                    {data?.numberTeacher}
                                </Typography>
                            </CardContent>
                            <Groups2Icon fontSize='large' color='disabled' sx={{ alignSelf: 'center', mr: 3 }}></Groups2Icon>
                        </Box>

                    </Card>
                </Link>
                <Link className="overview-item" to='/classes/all'>
                    <Card className=" overview-class" sx={{ display: 'flex', width: 250 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto', ml: 2 }}>
                                <Typography component="div" color="rgb(230, 211, 0)" variant="body2">
                                    Tổng số lớp diễn ra
                                </Typography>
                                <Typography variant="h4" color="dark" component="div">
                                    {data?.numberClass}
                                </Typography>
                            </CardContent>
                        </Box>
                        <SchoolIcon fontSize='large' color='disabled' sx={{ alignSelf: 'center', mr: 3 }}></SchoolIcon>
                    </Card>
                </Link>
            </div>
            <div className="chart" style={{ width: '100%', }}>
                <Typography variant='h5' color={'green'} className='text-center'>Thống kê số học sinh đăng kí vào các khóa học</Typography>
                {data ?
                    <BarChart
                        xAxis={[{ scaleType: 'band', dataKey: 'label', categoryGapRatio: 0.5, }]}
                        dataset={data.dataSet}
                        series={[{ dataKey: 'numberStudent', label: 'Số lượng học sinh' }]}
                        height={400}
                    />
                    :
                    <div className="text-center mt-4">
                        <CircularProgress  />
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage;
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './footer.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
export default function ColumnsGrid() {
    return (
        <div className='mt-5 footer-container'>
            <Box className="container" sx={{ flexGrow: 1, padding: 3 }}>
                <Grid container spacing={2} columns={14}>
                    <Grid className='footer-item' item xs={4}>
                        <h5>Thông tin liên hệ</h5>
                        <ul>
                            <li style={{ listStyle: 'none' }} className='footer-item_infor'>
                                <LocationOnIcon color='error' /> Địa chỉ:
                                <Typography sx={{ display: 'inline' }} variant='body1'>
                                    Hẻm 553, đường 30/4, Ninh Kiều, Cần Thơ
                                </Typography>
                            </li>
                            <li style={{ listStyle: 'none' }} className='footer-item_infor'><PhoneInTalkIcon color='error' /> Số điện thoại: 0795924466</li>
                            <li style={{ listStyle: 'none' }} className='footer-item_infor'><EmailIcon color='error' /> Email: oceanenglish@gmail.com</li>
                        </ul>
                    </Grid>
                    <Grid className='footer-item' item xs={4}>
                        <div style={{ paddingLeft: 50 }}>
                            <h5>Về OceanEnglish</h5>
                            <li className='footer-item_infor'>
                                Sứ mệnh tầm nhìn
                            </li>
                            <li className='footer-item_infor'>Giá trị cốt lỗi</li>
                            <li className='footer-item_infor'>Vì sao chọn Ocean English</li>
                        </div>
                    </Grid>
                    <Grid className='footer-item' item xs={4}>
                        <h5>Các khóa học</h5>
                        <li className='footer-item_infor'>
                            Tiếng Anh Người Lớn
                        </li>
                        <li className='footer-item_infor'>
                            Tiếng Anh Thiếu Niên
                        </li>
                        <li className='footer-item_infor'>
                            Tiếng Anh Trẻ Em
                        </li>
                    </Grid>

                    <Grid className='footer-item' item xs={2}>
                        <img src="./assets/image/logo/logo.png" width={200} alt="" />

                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
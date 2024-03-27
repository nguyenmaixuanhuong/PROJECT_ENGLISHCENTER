import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import './header.style.scss'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300, backgroundColor: '#001567', height: '100vh' }} role="presentation" onClick={toggleDrawer(false)}>
      <div className='d-flex justify-content-between py-3 bg-white'>
        <div className='d-flex'>
          <img src="./assets/image/logo/logo.png" width={100} alt="" />
          <Typography fontWeight={700} variant='h6' sx={{ alignSelf: 'flex-end', marginBottom: 1, color: '#001567' }}>Ocean EngLish </Typography>
        </div>
        <CloseIcon color='error' sx={{ alignSelf: 'start', marginRight: 2, fontSize: '28px' }}></CloseIcon>
      </div>
      <List sx={{ paddingLeft: 3 }}>
        <ListItem>
          <Link to="/" className='nav-item_link'>
            <Button sx={{ color: 'white' }} variant="text">Trang Chủ</Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/about" className='nav-item_link'>
            <Button sx={{ color: 'white' }} variant="text">Về Ocean English</Button>
          </Link>
        </ListItem>
        <ListItem>
          <div className='nav-item_link '>
            <Button  sx={{ color: 'white' }} className='courses' variant="text">Các Khóa Học <ArrowDropDownIcon></ArrowDropDownIcon> </Button>
            <div className='list-course'>
              <Paper>
                <MenuList sx={{ padding: 2 }}>
                  <Link to="/course/Trẻ em" className='link-course'>
                    <MenuItem sx={{ padding: 1, borderBottom: '1px solid rgb(215, 215, 215)' }}>
                      Khóa dành cho trẻ em
                    </MenuItem>
                  </Link>
                  <Link to="/course/Thiếu niên" className='link-course'>
                    <MenuItem sx={{ padding: 1, borderBottom: '1px solid rgb(215, 215, 215)' }}>
                      Khóa dành cho Thiếu niên
                    </MenuItem>
                  </Link>
                  <Link to="/course/Người lớn" className='link-course'>
                    <MenuItem sx={{ padding: 1, borderBottom: '1px solid rgb(215, 215, 215)' }}>
                      Khóa dành cho Người lớn
                    </MenuItem>
                  </Link>
                </MenuList>
              </Paper>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <Link to="/teacher" className='nav-item_link'>
            <Button sx={{ color: 'white' }} variant="text">Đội Ngũ Giáo Viên</Button>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <Button sx={{ color: 'white' }} onClick={toggleDrawer(true)} ><MenuIcon fontSize='large' ></MenuIcon></Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
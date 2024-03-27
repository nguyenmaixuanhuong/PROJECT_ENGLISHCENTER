import { Link } from "react-router-dom";
import './homepage.style.scss'
import { useCallback, useState } from 'react';
import Carousel from '../../layouts/MainLayout/Components/Carousels/carousel'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import SelectedCourse from "../../components/course/SelectedCourse/SelectedCourse";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [value, setValue] = useState('1');
    const [selected, setSelected] = useState('')
    const navigate = useNavigate();

    function gotoCourse() {
        if(selected){
            navigate(`/coursedetail/${selected}`)
        }
        else{
           navigate('/')
        }
    }

    const handleChangeCourse = useCallback((selectedOptions) => {
        setSelected(selectedOptions);
    }, []);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="homepage">
            <Carousel></Carousel>
            <div className="container">
                <div className="select_course ">
                    <div className="select_course-header">
                        <h5>BẠN MUỐN TÌM</h5>
                    </div>
                    <div className="select_course-search">
                        <div className="d-flex justify-content-center">
                            <SelectedCourse handleChangeCourse={handleChangeCourse}></SelectedCourse>
                            <Button onClick={gotoCourse} variant="contained" sx={{ marginLeft: 3 }}>
                                <SearchIcon></SearchIcon> Tìm kiếm
                            </Button>
                        </div>
                        <p className="text-center pt-3 ">Không tìm thấy khóa học phù hợp? Liên hệ với chúng tôi 029.23831000</p>
                    </div>
                </div>
                <div className="introduce ">
                    <div className="content_item row">
                        <div className="content_introduce col-md-6 col-sx-12">
                            <h3 className="title" >SỨ MỆNH & TẦM NHÌN</h3>
                            <div className="pb-5">
                                <p>Sứ mệnh</p>
                                <span>Trở thành một ngôi trường uy tín về chất lượng cùng thật nhiều yêu thương và hạnh phúc.</span>
                            </div>
                            <div>
                                <p>Tầm nhìn</p>
                                <span>Cùng tạo ra cho thế hệ trẻ Việt Nam nền tảng ngông ngữ vững vàng cùng sự tự tin để sẵn sàng tiếp cận tri thức,
                                    phát triển bản thân và hội nhập.</span>
                            </div>
                        </div>
                        <div className="content_image col-md-6 col-sx-12">
                            <img src="./assets/image/slider/slider1.png" alt="" />
                        </div>
                    </div>
                    <div className="content_item row">
                        <div className="content_image col-md-6 col-sx-12">
                            <img src="./assets/image/slider/introduce.png" alt="" />
                        </div>
                        <div className="content_introduce col-md-6 col-sx-12 p-5">
                            <h4 className="title">Đa dạng các hoạt động ngoại khoá giao lưu tiếng Anh với học sinh sinh viên</h4>
                            <div className="pt-4">
                                <span>Các câu lạc cùng nhiều hoạt động giúp học viên tự tin giao tiếp tiếng Anh trong và ngoài lớp học</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="introduce_course">
                    <Box sx={{ width: '100%', typography: 'body1', textAlign: 'center' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                                <TabList className="tabList" onChange={handleChangeValue} aria-label="lab API tabs example">
                                    <Tab className='tab-item' label="KHÓA HỌC DÀNH CHO TRẺ EM" value="1" />
                                    <Tab className='tab-item' label="KHÓA HỌC DÀNH CHO THIẾU NIÊN" value="2" />
                                    <Tab className='tab-item' label="KHÓA HỌC DÀNH CHO NGƯỜI LỚN" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel className='tab-content row' value="1">
                                <p className="col-md-8 col-sm-12 tab-content_introduce">Chương trình tiếng Anh thiếu nhi - YLEs (VERY YOUNG LEARNERS OF ENGLISH) được thiết kế dành cho học viên trong độ tuổi Tiểu học.
                                    Các chủ đề trong chương trình học gần gũi với cuộc sống hàng ngày và được minh hoạ bằng nhiều hình ảnh sinh động, góp phần nuôi dưỡng sự yêu thích tiếng Anh cho học viên mới bắt đầu.
                                    Bên cạnh đó, chương trình được thiết kế đặc biệt hướng đến việc phát triển toàn diện các kỹ năng ngôn ngữ cho học viên
                                    , trong đó ngữ âm và kỹ năng giao tiếp được đặc biệt chú trọng.
                                </p>
                                <div className="col-md-4 col-sm-12 tab-content_img">
                                    <img src="./assets/image/other/children.jpg" alt="" />
                                </div>
                            </TabPanel>
                            <TabPanel className='tab-content row' value="2">
                                <p className="col-md-8 col-sm-12 tab-content_introduce">Chương trình tiếng Anh Thiếu niên - EFT (ENGLISH FOR TEENS) được thiết kế dành cho học viên trong độ tuổi Trung học cơ sở (11-15 tuổi). Các bài học và các hoạt động đáp ứng các chủ điểm gợi ý trong khung chương trình tiếng Anh phổ thông, đáp ứng tốt các yêu cầu về kiến thức và kỹ năng tham chiếu trình độ ngôn ngữ ngôn ngữ chung từ A1-B1 (CEFR). Chương trình bao gồm các nhóm khoá học Pre-teens, EFT - THINK, và Academic English (Tiếng Anh Học Thuật). Chương trình được thiết kế đặc biệt hướng đến việc phát triển toàn diện các kiến thức và kỹ năng ngôn ngữ cho học viên, kỹ năng giao tiếp được đặc biệt chú trọng. Bên cạnh đó, chương trình còn chú ý đến việc định hình và nâng cao nhận thức, thái độ của học sinh về các giá trị nhân cách và giá trị bản thân.
                                </p>
                                <div className="col-md-4 col-sm-12 tab-content_img">
                                    <img src="./assets/image/other/younger.jpg" alt="" />
                                </div>
                            </TabPanel>
                            <TabPanel className='tab-content row' value="3">
                                <p className="col-md-8 col-sm-12 tab-content_introduce">English For Life - EFL là chương trình tiếng Anh tổng quát được thiết kế dành cho học viên người lớn có điểm xuất phát ở mức cơ bản. Chương trình bao gồm 05 cấp lớp học nền tảng (Basic, EFL 1, EFL 2, EFL 3  và EFL 4) và 2 lớp luyện thi đầu ra (A2-KET và B1-PET). Chương trình được thiết kế nhằm vào 02 mục đích quan trọng: (1) từng bước giúp học viên xây dựng các nền tảng kiến thức và kỹ năng ngôn ngữ cần thiết đảm bảo đủ năng lực tham gia các chương trình luyện thi chứng chỉ đầu ra ở bậc A2 và B1, và (2) xây dựng kiến thức và kỹ năng nền tảng để học viên tự tin bước sang chương trình tiếng Anh IELTS học thuật. Mỗi khóa học kéo dài trong 10 tuần học và thời lượng của cả chương trình học kéo dài trung bình trong một năm. Cuối cấp độ EFL 4, học viên có thể tham gia lớp luyện thi B1 (VSTEP/ PET) hoặc liên thông trực tiếp lên cấp độ PRE-IELTS và IELTS 4.5 tại Gia Việt.
                                </p>
                                <div className="col-md-4 col-sm-12 tab-content_img">
                                    <img src="./assets/image/other/adjust.jpg" alt="" />
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
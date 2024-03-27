import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Link } from 'react-router-dom';
import './About.style.scss';
import { Typography } from '@mui/material';
function AboutPage() {
    return (
        <div className="about-container">
            <div className="about-header">
                <h3 className='about-title'> Về trung tâm OceanEnglish</h3>
                <div role="presentation" >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to='/' style={{ textDecoration: 'none', color: 'black' }} >
                            <HomeIcon sx={{ mr: 0.5, mb: 1 }} fontSize="medium" />
                            Trang Chủ
                        </Link>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Về trung tâm OceanEnglish
                        </Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="about-body container">
                <div className="image">
                    <img src="./assets/image/slider/slider1.png" alt="" />
                </div>
                <ul>
                    <li className='about-item'>
                        <p className="tilte">
                            1. Chương trình đào tạo toàn diện:
                        </p>
                        <p>Chương trình liên thông từ cấp độ khởi đầu dành cho trẻ em độ tuổi mầm non nâng dần lên mốc chuẩn đầu ra là chương trình chứng chỉ IELTS Quốc tế; ngôn ngữ được phát triển lồng ghép với các kỹ năng và giá trị sống giúp học viên tự tin hòa nhập toàn cầu.</p>
                    </li>
                    <li className='about-item'>
                        <p className="tilte">
                            2. Tập thể giáo viên chất lượng:
                        </p>
                        <p>Lấy chất lượng làm tiêu chí phấn đấu hàng đầu, Gia Việt luôn tuân thủ và nêu cao các chuẩn mực về năng lực chuyên môn và đạo đức nghề nghiệp. Công tác tuyển dụng giáo viên, đào tạo và bồi dưỡng chuyên môn được chú trọng đúng mực, luôn tiên phong trong công tác phát triển chuyên môn, đào tạo giáo viên, nghiên cứu ứng dụng đổi mới giảng dạy và các hoạt động hội nghị, hội thảo trong và ngoài nước.</p>
                    </li>
                    <li className='about-item'> <p className="tilte">4. Chi phí học tập tiết kiệm với nhiều chế độ khuyến học:</p>
                        <p>học phí tiết kiệm, giáo trình gốc được tặng kèm, chế độ học bổng khuyến khích tinh thần học tốt và học bổng vượt khó đa dạng, nhiều chế độ đãi ngộ dành cho  nhiều đối tượng bao gồm giáo viên, cán bộ công tác trong ngành giáo dục.</p>
                    </li>
                    <li className='about-item'> <p className="tilte">5. Đa dạng hoạt động ngoại khoá hỗ trợ:</p>
                        <p>Nhiều hoạt động ngoại khoá được tổ chức thường xuyên nhằm tạo cơ hội cho học viên ứng dụng ngôn ngữ trong thực tiễn đời sống, phát triển các kỹ năng và giá trị sống quan trọng: CLB tiếng Anh hàng tuần, hoạt động tương tác dành cho học viên trẻ em (Interactive activities), các chương trình trải nghiệm hè (Fantastic Summer)</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AboutPage;
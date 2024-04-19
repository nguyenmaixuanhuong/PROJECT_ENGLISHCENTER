import { useEffect, useState } from 'react';
import * as React from 'react';
import EditorText from '../../EditorText/EditorText';
import './NewsClass.style.scss'
import Button from '@mui/material/Button';
import { useSelector ,useDispatch} from "react-redux";
import { listInformation, deleteNews } from '../../../services/information';
import Information from './Information';
import { removeNotify } from '../../../store/NotifiySlice';
function NewsClass({ classCurrent }) {
    const role = useSelector((state) => state.user?.role)
    const user = useSelector((state) => state.user?.user)
    const idInfor = useSelector((state) => state.notify?.idNotify)
    const dispatch = useDispatch()
    const [informations, setInformations] = useState([])
    const [render, setRender] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    const renderNews = () => {
        setRender(!render)
    }

    const handleDeleteNews = async (id) => {
        try {
            await deleteNews(id, classCurrent?._id)
            setRender(!render);
        } catch (error) {
            alert('Đã có lỗi xảy ra')
        }
    }

    const scrollToNews = () => {
        if (informations.length > 0) {
            const notificationElement = document.getElementById(idInfor);
            console.log(notificationElement);
            if (notificationElement) {
                notificationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                notificationElement.classList.add('checkNotify')
                setTimeout(() => {
                    notificationElement.classList.remove('checkNotify') // Hủy bỏ background color
                }, 1000);
                dispatch(removeNotify());
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const list = await listInformation(classCurrent?._id);
            setInformations(list);
        }
        fetchData();
        scrollToNews();
    }, [render, classCurrent])

    useEffect(() => {
        scrollToNews(); // Gọi hàm scrollToNews sau khi dữ liệu đã được tải và cập nhật
    }, [informations, idInfor]);

    return (
        <div className="newsclass">
            <div className="poster-class">
                <h1>{classCurrent?.className}</h1>
            </div>
            <div className="">
                <div className="title-news">
                    <h3>BẢNG TIN</h3>
                    {role === 'Teacher' ?
                        <Button onClick={handleOpen} variant='contained' sx={{ marginBottom: 2 }}>ĐĂNG TIN</Button>
                        : ''
                    }
                </div>
                {open ?
                    <EditorText handleClose={handleClose} renderNews={renderNews} idclass={classCurrent?._id} iduser={user?._id} createExercises={false} />
                    : ''}
                {informations && informations.map((information) => (
                    <div className='' key={information._id} id={information._id}>
                        <Information handleDeleteNews={handleDeleteNews} information={information} renderNews={renderNews} role={role} user={user}></Information>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsClass;
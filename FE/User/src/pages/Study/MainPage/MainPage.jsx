import { useAuthCheckLogin } from "../../../Context/auth";
import { useSelector } from "react-redux";
import CardClass from '../../../components/Class/CardClass/CardClass'
import './MainPage.style.scss'
function MainPage() {
    useAuthCheckLogin();
    const classes = useSelector((state) => state.classes?.class)
    let classSort = [];
    if (classes) {
        classSort = Array.from(classes);
        classSort.sort((a, b) => a.isFinish - b.isFinish);
    }
    return (
        <div className=" container  pt-4 ">
            <div className="study_listclass">
                {classSort && classSort.map((item) => (
                    <CardClass class={item}></CardClass>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
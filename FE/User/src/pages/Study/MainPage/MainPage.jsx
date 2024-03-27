import { useAuthCheckLogin } from "../../../Context/auth";
import { useSelector } from "react-redux";
import CardClass from '../../../components/Class/CardClass/CardClass'
import './MainPage.style.scss'
function MainPage() {
    useAuthCheckLogin();
    const classes = useSelector((state) => state.classes?.class)
    return (
        <div className=" container  pt-4 ">
            <div className="study_listclass">
            {classes && classes.map((item) => (
                <CardClass class={item}></CardClass>
            ))}
            </div>
        </div>
    );
}

export default MainPage;
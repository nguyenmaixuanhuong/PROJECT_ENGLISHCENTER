import { useEffect, useState } from "react"
import styles from "./history.module.scss"
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
import ExemItiem from "../../components/examItem"
import Typography from "@mui/material/Typography";
import LayoutUser from "@/components/layouts/MainLayout/layoutUser";
const History = () => {
    const userId = useSelector((state) => state.user.user._id);
    const [examsHistory, setExamsHistory] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {
        const fetchExamsHistory = async () => {
            const res = await fetch(`/api/getAllExam?userId=${userId}`);
            const data = await res.json();
            if (data) {
                const examsHistory = data.filter(exam => (exam.summary.endTime && new Date(exam.summary.endTime) < Date.now()))
                setExamsHistory(examsHistory);
            };
        }
        fetchExamsHistory();
    }, [render])

    const handleRender = () => {
        setRender(!render);
    }

    return (
        <div className={styles.history_container}>

            <Grid container>
                {examsHistory.map((exam, i) => (
                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                        <ExemItiem handleRender={handleRender} exam={exam} status={'end'}></ExemItiem>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

History.getLayout = function getLayout(page) {
    return <LayoutUser><Container>{page}</Container></LayoutUser>;
};

export default History;
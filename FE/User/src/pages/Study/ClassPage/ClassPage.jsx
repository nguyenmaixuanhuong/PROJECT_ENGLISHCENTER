import { useParams } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './ClassPage.style.scss';
import { getClass } from "../../../services/class.api";
import ListParticipants from "../../../components/Class/ListParticipants/ListParticipants";
import NewsClass from "../../../components/Class/NewsClass/NewsClass";
import Attendance from "../../../components/Class/Attendance/Attendance";
import { useAuthCheckLogin } from "../../../Context/auth";
function ClassPage() {
    useAuthCheckLogin();
    const { id } = useParams();
    const [value, setValue] = React.useState('1');
    const [classCurrent, setClassCurrent] = React.useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        async function fetchData() {
            const classCurrent = await getClass(id);
            setClassCurrent(classCurrent);
        }
        fetchData();
    }, [id]);

    return (
        <div className="container-fluid">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: 1 }}>
                        <TabList className="tabstudy" onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className="tabstudy-item" label="BẢNG TIN" value="1" />
                            <Tab className="tabstudy-item" label="ĐIỂM DANH" value="2" />
                            <Tab className="tabstudy-item" label="MỌI NGƯỜI" value="3" />
                        </TabList>
                    </Box>
                    <div className="content-inclass">
                        <TabPanel value="1">
                            <NewsClass classCurrent={classCurrent} />
                        </TabPanel>
                        <TabPanel value="2">
                            <Attendance classCurrent={classCurrent} />
                        </TabPanel>
                        <TabPanel value="3">
                            <ListParticipants teachers={classCurrent?.teachers} students={classCurrent?.students} />
                        </TabPanel>
                    </div>
                </TabContext>
            </Box>
        </div>
    );
}

export default ClassPage;
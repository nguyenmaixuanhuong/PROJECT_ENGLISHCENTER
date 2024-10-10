import styles from "./exam.module.scss"
import ExemItiem from "../../components/examItem"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getInforUser } from "@/store/userSlice";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';
import { exitCreateExam } from "@/store/examSlice";
import { useRouter } from "next/router";
import AppBarUser from "@/components/layouts/MainLayout/appbarUser";
import LayoutUser from "@/components/layouts/MainLayout/layoutUser";
import getAllExams from "../api/getAllExam";
import getExamsByClass from "../api/getExamByClass";

const Exams = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const role = Cookies.get('role');
    const userId = Cookies.get('userId');
    const [draftExams, setDraftExams] = useState({});

    const [exams, setExams] = useState({
        examNow: [],
        examUpcoming: [],
        examCreated: [],
    })
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(false);
    useEffect(() => {
        const fetchInforUser = async () => {
            try {
                if (role && userId) {
                    const response = await axios.get('http://localhost:8080/auth/infor', { params: { id: userId, role: role } });
                    const userInfor = {
                        "user": response.data,
                        "role": role
                    }

                    dispatch(getInforUser(userInfor))
                }
            } catch (error) {
                console.log(error.message);
            }
        };


        fetchInforUser();

    }, [userId]);

    const fetchDrafts = async () => {
        const res = await fetch(`/api/getExamDrafts?teacherId=${userId}`);
        const data = await res.json();
        setDraftExams(data);
    };
    useEffect(() => {
        const fetchExams = async () => {
            setLoading(true);
            let data;
            if (role === 'Teacher') {
                data = await getAllExams(userId)
                fetchDrafts();
            }
            else {
                data = await getExamsByClass(userId);
            }

            const examNow = [];
            const examUpcoming = [];
            const examCreated = [];

            if (data) {
                for (const item of data) {
                    if (role === 'Teacher' && (Date.now() <= new Date(item?.summary.endTime) || item?.summary.endTime == null)) {
                        examCreated.push(item)
                    }
                    else if (
                        (new Date(item?.summary.startTime) <= Date.now() && Date.now() <= new Date(item?.summary.endTime))
                        || (new Date(item?.summary.startTime) <= Date.now() && !item?.summary.endTime)
                        || !item?.summary.startTime

                    ) {
                        examNow.push(item)
                    }
                    else if (new Date(item?.summary.startTime) > Date.now()) {
                        examUpcoming.push(item)
                    }

                }
                setExams({ examNow, examUpcoming, examCreated });

            }
            setLoading(false);
        };
        fetchExams();
    }, [userId, render]);

    const handleRender = () => {
        setRender(!render);
    }

    return (
        <div className={styles.exams_container}>
            <div>
                <div className={styles.exams_header}>
                    <h2>
                        Bài kiểm tra
                    </h2>
                    {role === "Teacher"
                        ?
                        <Button onClick={() => {

                            dispatch(exitCreateExam());
                            router.push(`/exams/create-exam?status=create&&userId=${userId}`)
                        }}
                            sx={{ backgroundColor: "#001567" }} variant="contained" startIcon={<AddIcon />}>Tạo bài kiểm tra</Button>

                        : ""
                    }
                </div>
            </div>
            {role === "Teacher" ?
                <div className={styles.exams_list}>
                    <h4>Đã soạn</h4>
                    <Divider sx={{ p: 0.5 }}></Divider>
                    <Grid container>
                        {loading ? <CircularProgress sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }} />
                            :
                            <>
                                {
                                    exams.examCreated.length > 0 ? exams.examCreated.map((exam, i) => (
                                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                            <ExemItiem exam={exam} status={"now"} handleRender={handleRender}></ExemItiem>
                                        </Grid>
                                    ))
                                        :
                                        <Box sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }}>
                                            <Image src={'/images/image/empty_exam.png'} width={100} height={100} ></Image>
                                            <Typography sx={{ mt: 2 }} variant="body2">Chưa có bài kiểm tra nào</Typography>
                                        </Box>

                                }
                            </>
                        }

                    </Grid>
                </div> :

                <div className={styles.exams_list}>
                    <h4>Đang diễn ra</h4>
                    <Divider sx={{ p: 0.5 }}></Divider>
                    <Grid container>
                        {loading ? <CircularProgress sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }} />
                            :
                            <>
                                {exams.examNow.length > 0 ? exams.examNow.map((exam, i) => (
                                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                        <ExemItiem handleRender={handleRender} exam={exam} status={"now"}></ExemItiem>
                                    </Grid>
                                ))
                                    :
                                    <Box sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }}>
                                        <Image src={'/images/image/empty_exam.png'} width={100} height={100} ></Image>
                                        <Typography sx={{ mt: 2 }} variant="body2">Chưa có bài kiểm tra nào</Typography>
                                    </Box>

                                }
                            </>
                        }

                    </Grid>
                </div>
            }
            {role === "Teacher" ?
                <div className={styles.exams_list}>
                    <h4>Đang soạn</h4>
                    <Divider sx={{ p: 0.5 }}></Divider>
                    <Grid container>
                        {loading ? <CircularProgress sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }} />
                            :
                            <>
                                {Object.entries(draftExams).map(([key, value]) => (
                                    <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                                        <ExemItiem handleRender={handleRender} exam={{ ...value, _id: key }} status={"loading"} />
                                    </Grid>
                                ))}
                            </>
                        }


                    </Grid>
                </div>
                :
                <div className={styles.exams_list}>
                    <h4>Sắp diễn ra</h4>
                    <Divider sx={{ p: 0.5 }}></Divider>
                    <Grid container>
                        {loading ? <CircularProgress sx={{ padding: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'grey' }} />
                            :
                            <>
                                {exams.examUpcoming.map((exam, i) => (
                                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                        <ExemItiem exam={exam} status={"upcoming"}></ExemItiem>
                                    </Grid>
                                ))}
                            </>
                        }

                    </Grid>
                </div>

            }
        </div>
    )
}

Exams.getLayout = function getLayout(page) {
    return <LayoutUser><Container>{page}</Container></LayoutUser>;
};

export default Exams;
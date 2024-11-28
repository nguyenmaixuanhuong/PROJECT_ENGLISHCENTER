import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import ExemItiem from "@/components/examItem";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [exams, setExams] = useState([]);
  useEffect(() => {
    localStorage.setItem('testSubmitted', false);

    const fetchExams = async () => {
      const res = await fetch('/api/getExamPublic')
      if (res) {
        const data = await res.json();

        const exams = data.filter((item) => Date.now() <= new Date(item.summary.endTime) || !item.summary.endTime);
        setExams(exams);
      }
    }
    fetchExams();
  }, []);

  return (
    <div className={styles.home_container}>
      <Box sx={{ p: 2, backgroundColor: 'aliceblue', borderRadius: 10, mb: 3 }}>
        <Typography variant="h5" textAlign={'center'} fontWeight={'bold'} color={'#001567'}>Hệ Thống  Kiểm Tra</Typography>
      </Box>

      <Typography className={styles.titleHome} variant="body1" ml={2} width={'fit-content'} fontWeight={'bold'}>Công khai</Typography>


      <Grid container>
        {exams.map((exam, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <ExemItiem exam={exam} status={"now"}></ExemItiem>
          </Grid>
        ))
        }
      </Grid>

    </div>
  );
}

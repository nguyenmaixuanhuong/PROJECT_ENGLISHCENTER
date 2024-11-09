import TestLayout from "@/components/layouts/TestLayout";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionList } from "@/store/questionsSlice";
import { setExam } from "@/store/examSlice";
import { v4 as uuidv4 } from 'uuid';

export async function getServerSideProps(context) {
    const { id } = context.query;
    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = `${protocol}://${host}/api/getExam?examId=${id}`;
    const res = await fetch(apiUrl);
    const exam = await res.json();

    return {
        props: { exam },
    };
}

const Test = ({ exam }) => {
    console.log(exam);

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        // Giả sử `testSubmitted` là trạng thái lưu việc hoàn thành bài kiểm tra
        const testSubmitted = localStorage.getItem('testSubmitted');

        if (testSubmitted) {
            // Nếu người dùng đã hoàn thành bài kiểm tra, chuyển hướng đến trang chủ
            router.replace('/');
        }
        if (!user) {
            // Generate or retrieve a unique ID for the guest
            const existingGuestId = uuidv4();
            localStorage.setItem('guestId', existingGuestId);

        }
        const fetchExam = async () => {
            if (exam) {
                let allQuestions = [];
                const parts = exam.part
                parts.forEach(part => {
                    allQuestions = [...allQuestions, ...part.questions];
                });
                dispatch(setQuestionList(allQuestions));
                dispatch(setExam(exam));
            }
        };
        fetchExam();
    }, [])


    useEffect(() => {
        // Tự động chuyển đến phần đầu tiên
        router.push('/test/1');
    }, [router]);


    return null;
}

Test.getLayout = function getLayout(page) {
    return <TestLayout><Container>{page}</Container></TestLayout>;
};

export default Test;
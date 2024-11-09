const Part = require('../models/part.model');
const Exam = require('../models/exam.model')
const Answer = require('../models/answer.model');
const { calculateStudentScore, checkIsGraded } = require('../Service/caculateScore')
const { gradeWriting, gradeSpeaking, gradeChoices, gradeListeningAndReading } = require('../Service/autoTestAnswer')
const { suggestCourse } = require('../Service/suggestCourses');
const mongoose = require('mongoose');
exports.submitAnswer = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { examId, userId, answers } = req.body;

            // Lấy tất cả các phần và câu hỏi liên quan đến bài thi
            const exam = await Exam.findById(examId).populate({
                path: 'part',
                populate: {
                    path: 'questions',
                },
            });
            const answers_saved = await Answer.aggregate([
                {
                    $match: {
                        studentId: new mongoose.Types.ObjectId(userId), // Match theo studentId
                        examId: new mongoose.Types.ObjectId(examId) // Match theo examId
                    }
                },
                {
                    $group: {
                        _id: "$attempt", // Nhóm theo trường 'attempt'
                        firstAnswer: { $first: "$$ROOT" } // Lấy câu trả lời đầu tiên cho mỗi 'attempt'
                    }
                },
                {
                    $replaceRoot: { newRoot: "$firstAnswer" } // Đặt 'firstAnswer' thành document chính
                }
            ]);
            console.log(answers_saved);

            const answersToSave = [];

            // xet so lan lam bai cua user
            let attempt;
            if (answers_saved.length > 0) {
                attempt = answers_saved.length + 1;
                if (attempt > exam.summary.attempts) {
                    res.status(300).send("The number of test attempts has been exceeded")
                    return;
                }
            }
            else {
                attempt = 1;
            }

            // Sử dụng for...of để xử lý async/await
            for (const part of exam.part) {
                for (const question of part.questions) {
                    const typeQuestion = part.type !== 'Custom' ? part.type : question.questionType;

                    // Kiểm tra xem người dùng có trả lời câu hỏi này không
                    const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
                    let result;

                    if (exam.summary.autoGrade) {
                        result = await submitAutoGradeAnswer(question, userAnswer, typeQuestion, part);
                    } else {
                        result = await submitGradeAnswer(question, userAnswer);
                    }

                    // Tạo một bản ghi Answer   
                    const answerEntry = {
                        examId: examId,
                        studentId: userId,
                        partId: part._id,
                        questionId: question._id,
                        answer: userAnswer ? userAnswer.answer : '',
                        isCorrect: userAnswer ? userAnswer.isCorrect : null,
                        finalScore: result.finalScore,
                        comments: result.comments,
                        attempt: attempt
                    };

                    // Thêm vào danh sách các câu trả lời cần lưu
                    answersToSave.push(answerEntry);
                }
            }

            // Lưu tất cả các câu trả lời vào database
            await Answer.insertMany(answersToSave);

            res.status(200).json({ message: 'Exam submitted successfully' });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};


const submitGradeAnswer = async (question, userAnswer) => {
    let finalScore;
    if (userAnswer && userAnswer.isCorrect !== null) {
        if (userAnswer.isCorrect) {
            finalScore = question.score
        }
        else {
            finalScore = 0
        }
    }
    else {
        finalScore = null;
    }
    return { finalScore: finalScore, comments: null }
}

const submitAutoGradeAnswer = async (question, userAnswer, typeQuestion, part) => {
    let finalScore;
    let comments;
    if (userAnswer && userAnswer.isCorrect !== null) {
        if (userAnswer.isCorrect) {

            finalScore = question.score
        }
        else {
            finalScore = 0
            // goi lay comment
            if ((typeQuestion === 'Listening' || typeQuestion === 'Reading') && userAnswer && !userAnswer.isCorrect) {
                const choice = question.choices.filter(choice => choice.choiceValue === userAnswer.answer)
                const result = await gradeListeningAndReading(part, question, choice[0].choiceText, typeQuestion)
                comments = result;
            }
            else if ((typeQuestion !== 'Listening'
                && typeQuestion !== 'Reading'
                && typeQuestion !== 'Writing'
                && typeQuestion !== 'Speaking') && userAnswer && !userAnswer.isCorrect) {
                const choice = question.choices.filter(choice => choice.choiceValue === userAnswer.answer)
                const result = await gradeChoices(question.questionText, choice[0].choiceText)
                comments = result;
            }
        }
    }
    else {
        // Goi de cham diem cac bai writing va speaking
        if (typeQuestion === 'Writing' && userAnswer) {
            const result = await gradeWriting(userAnswer.answer, question.questionText);
            const { totalScore, ...comment } = result;
            finalScore = (totalScore * question.score) / 10;
            comments = comment;
        }

        if (typeQuestion === 'Speaking' && userAnswer) {
            const result = await gradeSpeaking(userAnswer.answer, question.questionText);
            const { totalScore, feedback } = result;
            finalScore = (totalScore * question.score) / 10;
            comments = feedback;
        }
    }
    return { finalScore: finalScore, comments: comments }

};
exports.isSubmitted = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        const examId = req.query.examId;

        const exam = await Exam.findById(examId);
        const answers = await Answer.aggregate([
            {
                $match: {
                    studentId: new mongoose.Types.ObjectId(studentId), // Match theo studentId
                    examId: new mongoose.Types.ObjectId(examId) // Match theo examId
                }
            },
            {
                $group: {
                    _id: "$attempt", // Nhóm theo trường 'attempt'
                    firstAnswer: { $first: "$$ROOT" } // Lấy câu trả lời đầu tiên cho mỗi 'attempt'
                }
            },
            {
                $replaceRoot: { newRoot: "$firstAnswer" } // Đặt 'firstAnswer' thành document chính
            }
        ]);
        if (exam.summary.attempts !== null) {
            if (answers.length >= exam.summary.attempts) {
                res.status(200).send({ isSubmitted: true })
            }
            else {
                res.status(200).send({ isSubmitted: false })
            }
        }
        else {
            res.status(200).send({ isSubmitted: false })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Error Server")

    }
}
exports.handleGetUserResults = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { examId, studentId } = req.query;

            // Lấy danh sách câu trả lời được group theo attempt
            const groupedAnswers = await Answer.aggregate([
                {
                    $match: {
                        examId: new mongoose.Types.ObjectId(examId), // Lọc theo examId
                        studentId: new mongoose.Types.ObjectId(studentId) // Lọc theo studentId
                    }
                },
                {
                    $group: {
                        _id: "$attempt", // Group theo attempt
                        answers: { $push: "$$ROOT" } // Đẩy toàn bộ câu trả lời vào một mảng
                    }
                },
                {
                    $sort: { _id: 1 } // Sắp xếp theo attempt
                }
            ]);
            if (groupedAnswers.length > 0) {
                // Duyệt qua từng attempt và lấy thông tin chi tiết của từng câu trả lời
                const answersByAttempt = await Promise.all(groupedAnswers.map(async (group) => {
                    const answersWithDetails = await Answer.find({
                        _id: { $in: group.answers.map(ans => ans._id) }  // Lấy các câu trả lời dựa vào các `_id` đã nhóm được
                    })
                        .populate({
                            path: 'questionId',
                        })
                        .populate({
                            path: 'studentId',
                            select: 'fullName',
                        })
                        .populate({
                            path: 'partId',
                            select: 'title number score type',
                        })
                        .populate({
                            path: 'examId',
                        });

                    // Nhóm các câu trả lời theo phần (`partId`)
                    const groupedResults = answersWithDetails.reduce((acc, answer) => {
                        // Kiểm tra xem phần (`part`) đã tồn tại trong nhóm chưa
                        let part = acc.find(p => p.partId === answer.partId._id.toString());
                        if (!part) {
                            // Nếu chưa tồn tại, thêm phần mới
                            part = {
                                partId: answer.partId._id.toString(),
                                partTitle: answer.partId.title,
                                partNumber: answer.partId.number,
                                partScore: answer.partId.score,
                                partType: answer.partId.type,
                                partPassage: answer.partId.passage,
                                partAudio: answer.partId.audioFile,
                                questions: [],
                            };
                            acc.push(part);
                        }

                        // Thêm câu hỏi và câu trả lời vào phần tương ứng
                        part.questions.push({
                            question: answer.questionId,
                            userAnswer: answer.answer,
                            isCorrect: answer.isCorrect,
                            finalScore: answer.finalScore,
                            answerId: answer._id,
                            comments: answer.comments
                        });

                        return acc;
                    }, []);

                    // Format kết quả cho từng `attempt`
                    return {
                        attempt: group._id, // attempt hiện tại
                        submitTime: answersWithDetails.length > 0 ? answersWithDetails[0].submittedAt : 'Unknown Time',
                        examSummary: answersWithDetails.length > 0 ? answersWithDetails[0].examId.summary : 'Unknown Exam',
                        isPublicScore: answersWithDetails[0].examId.isPublicScore,
                        parts: groupedResults.sort((a, b) => a.partNumber - b.partNumber),
                        finalScore: calculateStudentScore(answersWithDetails),  // Tính điểm của học sinh
                        user: answersWithDetails.length > 0 ? answersWithDetails[0].studentId : 'Unknown Exam'
                    };
                }));

                // Trả về kết quả cho tất cả các attempt
                res.status(200).json(answersByAttempt);
            }
            else {
                const exam = await Exam.findById(examId);
                res.status(400).json(exam);
            }
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// exports.handleGetUserResults = async (req, res) => {
//     try {
//         if (req.method === 'GET') {
//             const { examId, studentId } = req.query;

//             const groupedAnswers = await Answer.aggregate([
//                 {
//                     $match: {
//                         examId: new mongoose.Types.ObjectId(examId), // Lọc theo examId
//                         studentId: new mongoose.Types.ObjectId(studentId) // Lọc theo studentId
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: "$attempt", // Group theo attempt
//                         answers: { $push: "$$ROOT" } // Đẩy toàn bộ câu trả lời vào một mảng
//                     }
//                 },
//                 {
//                     $sort: { _id: 1 } // Sắp xếp theo attempt
//                 }
//             ]);

//             // Lấy tất cả các câu trả lời dựa trên `examId` và `studentId`
//             const answersByAttempt = await Promise.all(groupedAnswers.map(async (group) => {
//                 const answersWithDetails = await Answer.find({
//                     _id: { $in: group.answers }  // Lấy các câu trả lời dựa vào các `_id` đã nhóm được
//                 })
//                     .populate({
//                         path: 'questionId',
//                     })
//                     .populate({
//                         path: 'partId',
//                         select: 'title number score type',
//                     })
//                     .populate({
//                         path: 'examId',
//                     });

//                 return {
//                     attempt: group._id, // attempt hiện tại
//                     answers: answersWithDetails  // Các câu trả lời đã `populate`
//                 };
//             }));


//             if (answers.length > 0) {
//                 // Nhóm các câu trả lời theo phần (`partId`)
//                 const groupedResults = answers.reduce((acc, answer) => {
//                     // Kiểm tra xem phần (`part`) đã tồn tại trong nhóm chưa
//                     let part = acc.find(p => p.partId === answer.partId._id.toString());
//                     if (!part) {
//                         // Nếu chưa tồn tại, thêm phần mới
//                         part = {
//                             partId: answer.partId._id.toString(),
//                             partTitle: answer.partId.title,
//                             partNumber: answer.partId.number,
//                             partScore: answer.partId.score,
//                             partType: answer.partId.type,
//                             questions: [],
//                         };
//                         acc.push(part);
//                     }

//                     // Thêm câu hỏi và câu trả lời vào phần tương ứng
//                     part.questions.push({
//                         question: answer.questionId,
//                         userAnswer: answer.answer,
//                         isCorrect: answer.isCorrect,
//                         finalScore: answer.finalScore,
//                         answerId: answer._id,
//                         comments: answer.comments
//                     });

//                     return acc;
//                 }, [])
//                 // Format kết quả cuối cùng bao gồm thông tin bài thi và các phần
//                 const formattedResult = {
//                     examSummary: answers.length > 0 ? answers[0].examId.summary : 'Unknown Exam',
//                     isPublicScore: answers[0].examId.isPublicScore,
//                     parts: groupedResults.sort((a, b) => a.partNumber - b.partNumber),
//                     finalScore: calculateStudentScore(answers)
//                 };
//                 res.status(200).json(formattedResult);
//             }
//             else {
//                 const exam = await Exam.findById(examId);
//                 res.status(400).json(exam);
//             }

//         } else {
//             res.status(405).json({ message: 'Method not allowed' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

exports.getAllSubmisstions = async (req, res) => {
    try {

        const { examId } = req.query;
        const exam = await Exam.findById(examId).populate('summary.scope.classes');


        // Lấy tất cả kết quả bài làm của học sinh cho bài kiểm tra cụ thể
        const answers = await Answer.find({ examId })
            .populate({
                path: 'studentId',
                select: 'fullName class', // Lấy thông tin học sinh, bao gồm cả classId
                populate: {
                    path: 'class',
                    select: 'className' // Lấy tên lớp học
                }
            })


        // Format dữ liệu để hiển thị theo từng học sinh
        const studentResults = [];
        const studentAnswersMap = {};
        answers.forEach(async (answer) => {
            // push the answers of student
            if (!studentAnswersMap[answer.studentId._id]) {
                studentAnswersMap[answer.studentId._id] = [];
            }
            studentAnswersMap[answer.studentId._id].push(answer);

            // Lấy tên lớp học của học sinh
            const matchingClass = answer.studentId.class.find(studentClass =>
                exam.summary.scope.classes.some(examClass =>
                    examClass._id.toString() === studentClass._id.toString()
                )
            );

            const className = matchingClass ? matchingClass.className : 'No Class';
            let studentResult = studentResults.find(result => result._id === answer.studentId._id);

            // const attempt = await Answer.aggregate([
            //     {
            //         $match: {
            //             studentId: new mongoose.Types.ObjectId(answer.studentId._id), // Match theo studentId
            //             examId: new mongoose.Types.ObjectId(examId) // Match theo examId
            //         }
            //     },
            //     {
            //         $group: {
            //             _id: "$attempt", // Nhóm theo trường 'attempt'
            //             firstAnswer: { $first: "$$ROOT" } // Lấy câu trả lời đầu tiên cho mỗi 'attempt'
            //         }
            //     },
            //     {
            //         $replaceRoot: { newRoot: "$firstAnswer" } // Đặt 'firstAnswer' thành document chính
            //     }
            // ]);

            // tạo data của student
            if (!studentResult) {
                const student = {
                    _id: answer.studentId._id,
                    studentName: answer.studentId.fullName,
                    className: className,
                    submittedAt: answer.submittedAt,
                    totalScore: 0,
                    isGraded: false,
                    // attempts: attempt
                };
                studentResults.push(student)
            }
        });

        // tính totalScore
        studentResults.forEach(studentResult => {
            const studentId = studentResult._id;
            const studentAnswers = studentAnswersMap[studentId] || [];
            studentResult.totalScore = calculateStudentScore(studentAnswers);
            studentResult.isGraded = checkIsGraded(studentAnswers)
        });

        res.status(200).json(studentResults);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateFinalScore = async (req, res) => {
    try {
        const { answersUpdate } = req.body

        for (const answer of answersUpdate) {

            const answerUpdate = await Answer.findById(new mongoose.Types.ObjectId(answer.answerId))

            if (answerUpdate) {
                answerUpdate.finalScore = answer.finalScore
                await answerUpdate.save();
            }
            else {
                res.status(400).json({ message: 'Answer not found' });
                return;
            }
        }
        res.status(200).json({ message: 'oke' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.handleGuestSubmit = async (req, res) => {
    try {
        const { examId, guestId, answers } = req.body;

        // Lấy bài thi và phần thi với câu hỏi được populate
        const exam = await Exam.findById(examId).populate({
            path: 'part',
            populate: {
                path: 'questions',
            },
        });

        // Hàm xử lý điểm và trả về đối tượng answerEntry
        const processQuestion = async (question, userAnswer, part) => {
            let finalScore = 0;
            let comments = null;
            const typeQuestion = part.type !== 'Custom' ? part.type : question.questionType;

            if (typeQuestion === 'Writing' && userAnswer) {
                const result = await gradeWriting(userAnswer.answer, question.questionText);
                const { totalScore, ...comment } = result;
                finalScore = (totalScore * question.score) / 10;
                comments = comment;
            }

            if (typeQuestion === 'Speaking' && userAnswer) {
                const result = await gradeSpeaking(userAnswer.answer, question.questionText);
                const { totalScore, feedback } = result;
                finalScore = (totalScore * question.score) / 10;
                comments = feedback;
            }
            if ((typeQuestion === 'Listening' || typeQuestion === 'Reading') && userAnswer && !userAnswer.isCorrect) {
                const choice = question.choices.filter(choice => choice.choiceValue === userAnswer.answer)
                const result = await gradeListeningAndReading(part, question, choice[0].choiceText, typeQuestion)
                comments = result;
            }
            else if ((typeQuestion !== 'Listening'
                && typeQuestion !== 'Reading'
                && typeQuestion !== 'Writing'
                && typeQuestion !== 'Speaking') && userAnswer && !userAnswer.isCorrect) {
                const choice = question.choices.filter(choice => choice.choiceValue === userAnswer.answer)
                const result = await gradeChoices(question.questionText, choice[0].choiceText)
                comments = result;
            }

            return {
                question: question,
                userAnswer: userAnswer ? userAnswer.answer : '',
                isCorrect: userAnswer ? userAnswer.isCorrect : null,
                finalScore: userAnswer && userAnswer.isCorrect && userAnswer.isCorrect != null ? question.score : finalScore,
                comments: comments
            };
        };

        // Xử lý các phần thi
        const groupedResults = await Promise.all(exam.part.map(async (part) => {
            const partResult = {
                partId: part._id.toString(),
                partTitle: part.title,
                partNumber: part.number,
                partScore: part.score,
                partType: part.type,
                partPassage: part?.passage,
                partAudio: part?.audioFile,
                questions: []
            };

            const processedQuestions = await Promise.all(
                part.questions.map(async (question) => {
                    const userAnswer = answers.find(ans => ans.questionId === question._id.toString());
                    const answerEntry = await processQuestion(question, userAnswer, part);
                    return answerEntry;
                })
            );

            partResult.questions.push(...processedQuestions);
            return partResult;
        }));

        // Chuẩn bị kết quả trả về
        const resultAnswerGuest = {
            guestId: guestId,
            examSummary: exam.summary,
            isPublicScore: true,
            parts: groupedResults.sort((a, b) => a.partNumber - b.partNumber),
            finalScore: calculateStudentScore(groupedResults.flatMap(part => part.questions))
        };

        res.status(200).json(resultAnswerGuest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.SuggestScores = async (req, res) => {
    try {
        const score_skills = req.body;

        const result = await suggestCourse(score_skills);
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}


export const updatedSTTQuestions = (parts) => {
    let allQuestions = [];
    const partsUpdate = parts;
    partsUpdate.forEach(part => {
        allQuestions = [...allQuestions, ...part.questions];
    });

    // Cập nhật lại stt cho tất cả các câu hỏi
    allQuestions = allQuestions.map((question, index) => ({ ...question, number: index + 1 }));

    // Phân phối lại các câu hỏi đã cập nhật stt vào các phần tương ứng
    let questionIndex = 0;
    partsUpdate.forEach(part => {
        const numberOfQuestions = part.questions.length;
        part.questions = allQuestions.slice(questionIndex, questionIndex + numberOfQuestions);
        questionIndex += numberOfQuestions;
    });
    return partsUpdate;
}

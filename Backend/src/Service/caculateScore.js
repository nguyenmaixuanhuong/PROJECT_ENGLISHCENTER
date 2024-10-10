
exports.calculateStudentScore = (answers) => {
    return answers.reduce((totalScore, answer) => {
        return totalScore + (answer.finalScore || 0); // Nếu finalScore không tồn tại thì mặc định là 0
    }, 0);
};

exports.checkIsGraded = (answers) => {
    console.log(answers);

    return answers.every(answer => answer.finalScore !== undefined && answer.finalScore !== null);
};
const Course = require('../models/course.model');
const Level = require('../models/level.model');

const getScore = (list_course,) => {

}

exports.suggestCourse = async ({ grammar, speaking, writing, listening }) => {
    const recommendations = [];

    const levels = await Level.find();

    const list_course = Promise.all(levels.map(async (level) => {
        const courses = await Course.find({ level: level._id, isDeleted: false }).select(['courseName', 'image', 'category'])


        return {
            name: level.name,
            courses: courses
        }
    }))
    console.log(list_course);

    const thresholds = {
        low: 3,  // Scores below this will be considered very low
        medium: 5,  // Scores between 3 and 5 will be medium
        high: 7,  // Scores above this are high
    };

    // // Function to check score and suggest course
    const suggestBasedOnScore = (score, lowCourse, mediumCourse, highCourse) => {
        if (score < thresholds.low) {
            return lowCourse;
        } else if (score >= thresholds.low && score < thresholds.high) {
            return mediumCourse;
        } else {
            return highCourse;
        }
    };

    // // Grammar suggestion
    // recommendations.push(
    //     suggestBasedOnScore(grammar, 'Basic English', 'A1-A2', 'B1-B2')
    // );

    // // Speaking suggestion
    // recommendations.push(
    //     suggestBasedOnScore(speaking, 'Basic English', 'Communication English', 'IELTS')
    // );

    // // Writing suggestion
    // recommendations.push(
    //     suggestBasedOnScore(writing, 'Basic English', 'A1-A2', 'B1-B2')
    // );

    // // Listening suggestion
    // recommendations.push(
    //     suggestBasedOnScore(listening, 'Basic English', 'TOEIC', 'IELTS')
    // );

    // // If all scores are low, default to Basic English
    // const uniqueCourses = [...new Set(recommendations)];

    // if (uniqueCourses.length === 1 && uniqueCourses[0] === 'Basic English') {
    //     return ['Basic English'];
    // }

    return list_course;
}

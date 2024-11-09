const Course = require('../models/course.model');
const Level = require('../models/level.model');
const modelAI = require("../config/geminiaiConfig");


exports.suggestCourse = async (score_skills) => {
    try {

        const courses = await Course.find({ isDeleted: false })
            .populate({
                path: 'level',
                select: 'name'
            })
            .select(['courseName', 'image', 'category'])


        const prompt = `bạn là 1 chuyên gia phân tích dữ liệu về trình độ tiếng anh, 
    tôi có 1 danh sách các khóa học trong trung tâm của tôi và điểm từng phần writing, listening, speaking, grammar, reading của 1 học viên.
    Bạn hãy phân tích điểm từng phần của học viên đó, và gợi ý các khóa học trong trung tâm của tôi cho họ. 
    Danh sách khóa học bao gồm: 
     ${JSON.stringify(courses)}
    Điểm của học viên:
          ${JSON.stringify(score_skills)}
    Hãy trả về kết quả dưới dạng JSON như cấu trúc bên dưới.Với Feedback là lý do tại sao bạn gợi ý, chỉ trả lời 3-4 câu thôi:
    {
        "Feedback":"",
        "Courses":  [
        {
            _id:
            nameCourse:"",
            "category": "", 
            "image": "" 
        }
     ]
    }
   `

        const result = await modelAI.generateContent(prompt);

        const jsonString = result.response.text().replace(/```json|```/g, '').trim();

        const resultFormatJSON = JSON.parse(jsonString);

        return resultFormatJSON
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

}

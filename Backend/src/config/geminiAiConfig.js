const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLEAI_API_KEY);
const modelAI = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


module.exports = modelAI;

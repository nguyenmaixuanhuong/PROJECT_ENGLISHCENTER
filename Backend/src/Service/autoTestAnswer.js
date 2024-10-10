const { AssemblyAI } = require('assemblyai');
require('dotenv').config();
// gradeWriting.js
const modelAI = require("../config/geminiaiConfig");
const question = require('../models/questions.model');

exports.gradeWriting = async (text, question) => {
    try {
        const prompt = `
          Please analyze the text response from the following question: "${question}"
        for grammar, clarity, and writing quality. Provide feedback on errors found and give an overall score of 10
        Based on the following criteria:
        - Grammar and Spelling
        - Clarity and Coherence
        - Structure and Organization
        - Vocabulary and Style
        Text: "${text}"

        Responses should be in JSON format with the following structure, with only 1-2 comments per element:
        {
        "grammar": "Describes grammar and spelling issues.",
        "clarity": "Describes clarity and coherence.",
        "structure": "Describes structure and organization.",
        "vocabulary": "Describes vocabulary and style.",
        "totalScore": X
            }`
        const result = await modelAI.generateContent(prompt);

        const jsonString = result.response.text().replace(/```json|```/g, '').trim();

        const resultFormatJSON = JSON.parse(jsonString);

        return resultFormatJSON

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai


exports.gradeSpeaking = async (audioUrl, question) => {
    const client = new AssemblyAI({
        apiKey: process.env.AssemblyAI_API_KEY,
    });

    // Request parameters 
    const data = {
        audio: audioUrl
    }
    try {
        const transcript = await client.transcripts.transcribe(data)

        const prompt = `"You are a language assessor. Below is a text that has been transcribed from speech to text in response to question ${question}.
                         Please rate the text for grammatical accuracy, clarity, coherence, and whether it fits the question. 
                         After assessing these aspects, give it a score out of 10, with 10 being perfect grammar and clarity. Please also provide feedback on the following:
    
                    Grammar errors and suggestions.
                    Coherence and flow of ideas.
                    Suggestions for improving the clarity of the text.
                    The final score is from 1 to 10 based on grammar and coherence.
                    Here is the text to assess:
                    ${transcript.text}
                    Please provide detailed feedback along with the final score.Only Returned in json format like this with feeaback from 3-4 sentences:

                        {
                                feedback:" ",
                                totaScore:"."
                        }`
        if (transcript.text !== '') {
            const result = await modelAI.generateContent(prompt);
            const jsonString = result.response.text().replace(/```json|```/g, '').trim()

            const resultFormatJSON = JSON.parse(jsonString);

            return resultFormatJSON
        }
        return {
            feedback: "I can't hear what you're saying.",
            totalScore: 0
        }

    } catch (error) {
        console.error('Error:', error);
        return null;
    }

}

exports.gradeChoices = async (question, inCorrectAnswer) => {
    const prompt = `"You are an expert in teaching English. Below is a multiple choice question and the incorrect answer was selected by the user. Please evaluate the user's response and provide the following feedback:
        1. Explain why the user's selected answer is incorrect, along with the correct answer and a detailed explanation of why it is the correct choice.
        2. Write specifically what knowledge the user needs to find to improve their understanding of similar questions (present tense, future tense, past tense ...)

        Please provide feedback in JSON format with brief explanations (1-2 sentences):
        {
        "feedback": " ",
        "studySuggestions": " "
        }

        Here is the question:
        ${question}

        The user selected answer:
        ${inCorrectAnswer}"`
    try {

        const result = await modelAI.generateContent(prompt);

        const jsonString = result.response.text().replace(/```json|```/g, '').trim();

        const resultFormatJSON = JSON.parse(jsonString);

        return resultFormatJSON

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


exports.gradeListeningAndReading = async (part, question, inCorrectAnswer, type) => {
    try {
        const client = new AssemblyAI({
            apiKey: process.env.AssemblyAI_API_KEY,
        });

        let passage;
        if (type === 'Listening') {
            // Request parameters 
            const data = {
                audio: part.audioFile ? part.audioFile.url : question.audioFile.url
            }

            const transcript = await client.transcripts.transcribe(data)
            passage = transcript.text
        }
        else {
            passage = part.passage
        }

        const prompt = `"You are an expert in evaluating Listening and Reading comprehension questions. Below is a passage and a question related to that passage, along with the incorrect answer that the user selected.

            Your task is to:
            1. Analyze the passage and the question.
            2. Identify the mistake in the user's answer by comparing it with the information provided in the passage.
            3. Explain clearly why the selected answer is incorrect
            Please provide your feedback in JSON format with concise explanations (2-3 sentences):
            {
                "feedback": " ",
            }

            Here is the passage:
            ${passage}

            Here is the question:
            ${question.questionText}

            The answer the user selected:
            ${inCorrectAnswer}"`

        const result = await modelAI.generateContent(prompt);

        const jsonString = result.response.text().replace(/```json|```/g, '').trim();

        const resultFormatJSON = JSON.parse(jsonString);

        return resultFormatJSON
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

}
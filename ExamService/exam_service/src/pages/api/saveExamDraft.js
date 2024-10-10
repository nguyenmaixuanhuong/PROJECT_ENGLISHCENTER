import client from '../../lib/redisClient';

export default async function handlerSaveExamDraft(req, res) {
    if (req.method === 'POST') {
        const { userId, exam } = req.body;
        await client.connect();
        const draftId = `draft_${Math.random().toString(36).substr(2, 9)}`;
        await client.hSet(`teacher_${userId}`, draftId, JSON.stringify(exam));
        await client.disconnect();

        res.status(200).json({ message: 'Draft saved successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

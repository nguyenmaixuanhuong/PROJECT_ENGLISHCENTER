import client from '../../lib/redisClient';

export default async function handlerGetAnswer(req, res) {
    if (req.method === 'GET') {
        const { examId, userId } = req.query;
        if (!client.isReady) {
            await client.connect();
        }
        // Lấy tất cả các nháp của giáo viên
        const keys = await client.keys(`exam:${examId}:user:${userId}:part:*`);
        const answers = [];
        for (const key of keys) {
            const result = await client.hGetAll(key);
            answers.push({ partNumber: key.split(':').pop(), results: result });
        }
        await client.disconnect();
        res.status(200).json(answers);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
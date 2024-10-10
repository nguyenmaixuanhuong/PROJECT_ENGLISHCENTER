import client from '../../lib/redisClient';

export default async function handlerDeleteAnswer(req, res) {
    try {
        if (req.method === 'DELETE') {
            const { examId, userId } = req.body;

            if (!client.isReady) {
                await client.connect();
            }
            // Lấy tất cả các nháp của giáo viên
            const keys = await client.keys(`exam:${examId}:user:${userId}:part:*`);
            for (const key of keys) {
                const result = await client.del(key);
            }
            await client.disconnect();
            res.status(200).json({ message: 'oke' });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error server' });

    }

}
import client from '../../lib/redisClient';

export default async function handlerGetExamDrafts(req, res) {
    if (req.method === 'GET') {
        const { teacherId } = req.query;
        if (!client.isReady) {
            await client.connect();
        }
        // Lấy tất cả các nháp của giáo viên
        const drafts = await client.hGetAll(`teacher_${teacherId}`);

        // Chuyển đổi các nháp từ chuỗi JSON sang đối tượng
        const parsedDrafts = {};
        for (const [key, value] of Object.entries(drafts)) {
            parsedDrafts[key] = JSON.parse(value);
        }
        await client.disconnect();
        res.status(200).json(parsedDrafts);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
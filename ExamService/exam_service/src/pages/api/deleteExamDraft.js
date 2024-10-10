import client from '../../lib/redisClient';
export default async function deleteDraftExam(req, res) {
    try {
        const { userId, draftId } = req.body;
        await client.connect();
        const result = await client.hDel(`teacher_${userId}`, draftId);
        if (result === 1) {
            await client.disconnect();
            res.status(200).json({ message: 'Draft deleted successfully' });
        } else {
            await client.disconnect();
            res.status(400).json({ message: 'Not found' })
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
        await client.disconnect();
    }
}
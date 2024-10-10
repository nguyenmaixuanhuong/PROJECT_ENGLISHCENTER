import client from '../../lib/redisClient';


export default async function handler(req, res) {
    client.connect();
    if (req.method === 'PUT') {
        const { userId, draftId, updatedDraft } = req.body;
        console.log(userId, draftId, updatedDraft);

        // Kiểm tra xem nháp hiện tại có tồn tại không
        const existingDraft = await client.hGet(`teacher_${userId}`, draftId);

        if (existingDraft) {
            // Cập nhật nháp với giá trị mới
            await client.hSet(`teacher_${userId}`, draftId, JSON.stringify(updatedDraft));
            res.status(200).json({ message: 'Draft updated successfully' });
            client.disconnect();
        } else {
            res.status(404).json({ message: 'Draft not found' });
            client.disconnect();

        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
        client.disconnect();

    }
}

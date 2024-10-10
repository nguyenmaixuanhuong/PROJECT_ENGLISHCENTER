import client from '../../lib/redisClient';

export default async function handlerSaveAnswer(req, res) {
    try {

        const { userId, examId, partNumber, result } = req.body;
        // console.log(result);

        // Connect to Redis if not already connected
        if (!client.isReady) {
            await client.connect();
            // Save answer to Redis
            await client.hSet(`exam:${examId}:user:${userId}:part:${partNumber}`, result.questionId, JSON.stringify(result.answer));

            // Send success response
            res.status(200).json({ message: 'Saved successfully' });
        }
        else {
            await client.hSet(`exam:${examId}:user:${userId}:part:${partNumber}`, result.questionId, JSON.stringify(result.answer));
            // Send success response
            res.status(200).json({ message: 'Saved successfully' });
        }


    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        // Disconnect Redis client after operation
        if (client.isReady) {
            await client.disconnect();
        }
    }
}

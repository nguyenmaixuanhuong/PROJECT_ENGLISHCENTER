import client from '../../lib/redisClient';

export default async function handlerGetAnswer(req, res) {
    try {
        if (req.method === 'GET') {
            const { examId, userId, partNumber } = req.query;
            // Connect to Redis if not already connected
            if (!client.isReady) {
                await client.connect();
                // Retrieve answers from Redis
                const answers = await client.hGetAll(`exam:${examId}:user:${userId}:part:${partNumber}`);

                // Send answers as JSON response
                res.status(200).json(answers);
            }
            else {
                const answers = await client.hGetAll(`exam:${examId}:user:${userId}:part:${partNumber}`);
                // Send answers as JSON response
                res.status(200).json(answers);
            }


        } else {
            // Method not allowed
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error getting answers:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        // Disconnect Redis client after operation
        if (client.isReady) {
            await client.disconnect();
        }
    }
}

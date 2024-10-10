import { createClient } from 'redis';

let client;


if (!client) {
    client = createClient({
        url: 'redis://localhost:6379'
    });

    client.on('error', (err) => {
        console.error('Redis error:', err);
    });
}

export default client;

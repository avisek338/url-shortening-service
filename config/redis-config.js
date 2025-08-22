const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || 'redis', // use docker service name
        port: process.env.REDIS_PORT || 6379
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
   return await client.connect();
   
}

module.exports = { connectRedis, client };

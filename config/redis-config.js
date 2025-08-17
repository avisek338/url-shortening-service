const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19930.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19930
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
   return await client.connect();
   
}

module.exports = { connectRedis, client };

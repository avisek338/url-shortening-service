const RedisCache = require('redis-lru-cache');

class AppCache {
    constructor(redisClient) {
         this.cache = redisClient;
    }

    async set(key, value) {
        await this.cache.set(key, value);
    }

    async get(key) {
        return await this.cache.get(key);
    }
}



module.exports = AppCache;

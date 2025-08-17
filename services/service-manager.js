const { client } = require('../config/redis-config');
const {AppCache,RedisCounter,Base62Encoding}  = require('./');

class ServiceManager {
    createCounterService() {
        return new RedisCounter(client);
    }
    createCacheService() {
        return new AppCache(client);
    }
    createBase62EncodingService() {
        return new Base62Encoding();
    }
}

module.exports = ServiceManager;

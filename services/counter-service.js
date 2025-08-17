
class RedisCounter {
    constructor(redisClient) {
        this.client = redisClient;
    }
    
    async initializeCounter(counterName, startValue = 1) {
        // Set counter only if it doesn't exist
        if(this.client) {
            const exists = await this.client.exists(counterName);
            if (!exists) {
                await this.client.set(counterName, startValue);
                await this.client.persist(counterName);
                console.log(`Counter ${counterName} initialized with value: ${startValue}`);
            }
        return await this.client.get(counterName);
        }
    }
    
    async increment(counterName, amount = 1) {
        // INCR for +1, INCRBY for custom amounts
        if (amount === 1) {
            return await this.client.incr(counterName);
        } else {
            return await this.client.incrBy(counterName, amount);
        }
    }
    
    async decrement(counterName, amount = 1) {
        // DECR for -1, DECRBY for custom amounts
        if (amount === 1) {
            return await this.client.decr(counterName);
        } else {
            return await this.client.decrBy(counterName, amount);
        }
    }
    
    async getValue(counterName) {
        const value = await this.client.get(counterName);
        this.increment(counterName);
        return value ? parseInt(value) : null;
    }
    
    async reset(counterName, newValue = 0) {
        await this.client.set(counterName, newValue);
        return newValue;
    }
}



module.exports = RedisCounter;

const Redis = require('ioredis');

const redis = new Redis();

 
// Export the connected client
module.exports = redis;

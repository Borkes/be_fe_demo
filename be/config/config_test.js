'use strict'
var config = {};
config.redisConfig = {
    host: '127.0.0.1',
    port: 6379,
    opt: {
        auth_pass: 123456
    }
}

config.dbConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog',
    connectTimeout: 5000,
    connectionLimit : 5,
    waitForConnctions : true
}
module.exports = config;
//exports.config = config
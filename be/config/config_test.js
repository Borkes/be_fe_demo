'use strict'
var config = {};
config.redisConfig = {    //redis 配置
    host: '127.0.0.1',
    port: 6379,
    opt: {
        auth_pass: 123456
    }
}

config.dbConfig = {  //mysql数据库配置
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog',
    connectTimeout: 5000,
    connectionLimit: 5,
    waitForConnctions: true
}

config.mongoConfig = {
    url: 'mongodb://localhost/mhq',
}
module.exports = config;
//exports.config = config
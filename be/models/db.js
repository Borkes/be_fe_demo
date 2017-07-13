const mysql = require('mysql');
const dbconfig = require('../config').dbconfig;

class Mysql {
    constructor(dbconfig) {
        this.pool = null;
        this.Init(dbconfig);
    }
    Init(dbconfig) {
        if (!this.pool) {
            this.pool = mysql.createPool(dbconfig);
        }
    }
    query(sql, variable, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
            } else {
                connection.query(sql, variable, (err, data) => {
                    callback(err, data);
                })
                if (connection) {
                    connection.release();
                }
            }
        })
    }
}




const mysql = require('mysql');

class DatabaseModel {
    static connectDatabase() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'S300pmu1',
            database: 'homestay',
            charset: 'utf8_general_ci'
        });
    }

    static querySql(sql) {
        return new Promise((resolve, reject) => {
            this.connectDatabase().query(sql, (err, data) => {
                if (err) reject(err.message);
                else resolve(data);
            });
        });
    }
}

module.exports = DatabaseModel;
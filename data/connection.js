const mysql = require('mysql')

exports.connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'a1',
    multipleStatements: true
})
const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: ''
    },
    console.log(`Connected to the   database.`)
);

module.exports = connection;
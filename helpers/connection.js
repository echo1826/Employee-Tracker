const mysql = require('mysql2');
const util = require('util');
// connection to mafia_db to be exported for other js to use
const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mafia_db'
    },
    console.log(`Connected to the mafia_db database.`)
);

connection.query = util.promisify(connection.query);

module.exports = connection;
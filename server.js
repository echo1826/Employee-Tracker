const mysql = require('mysql2');
const inquire = require('inquirer');
// think about await and async for this initial inquirer

const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to employees_db database.`)
);
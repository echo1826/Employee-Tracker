const mysql = require('mysql2');
const inquire = require('inquirer');
const {askEmployee, askRole, askDepartment, updateRole, updateManager} = require('./helpers/questions');
const {viewEmployees, viewRoles, viewDepartments} = require('./helpers/queries');
// BONUS update employee, view employee by manager, view employee by department, delete department, role, employee
// view total salaries of all employees in department
// think about await and async for this initial inquirer

// connect to mafia_db
const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'mafia_db'
    },
    console.log(`Connected to mafia_db database.`)
);
// function to handle the answer given in the first inquire.prompt to decide what functions to call
const answerHandler = async function (answer) {
    switch (answer.choice) {
        case "View all departments": {
            // TODO: add function call here from queries.js
            await viewDepartments();
            askQuestion();
            break;
        }
        case "View all roles": {
            // TODO: add function call here from queries.js
            await viewRoles();
            askQuestion();
            break;
        }
        case "View all employees": {
            // TODO: add function call here from queries.js
            await viewEmployees();
            askQuestion();
            break;
        }
        case "Add a department": {
            // TODO: add function call here from queries.js
            await askDepartment();
            askQuestion();
            break;
        }
        case "Add a role": {
            // TODO: add function call here from queries.js
            await askRole();
            askQuestion();
            break;
        }
        case "Add an employee": {
            // TODO: add function call here from queries.js
            await askEmployee();
            askQuestion();
            break;
        }
        case "Update an employee role": {
            // TODO: add function call here from queries.js (bonus)
            await updateRole();
            askQuestion();
            break;
        }
        case "Update an employee's manager": {
            await updateManager();
            askQuestion();
            break;
        }
        default: {
            connection.end();
            process.exit();
        }
    }
}
// asks the user to decide what to do then calls the answerHandler function to get functionality
const askQuestion = function () {
    inquire.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Update an employee's manager",
            "Quit"
        ],
        name: "choice"
    }]).then((answer) => {
        answerHandler(answer);
    });
}
askQuestion();
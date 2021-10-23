const mysql = require('mysql2');
const inquire = require('inquirer');
const {
    addEmployee,
    addRole,
    addDepartment,
    viewEmployees,
    viewRoles,
    viewDepartments
} = require('./helpers/questions');
// BONUS update employee, view employee by manager, view employee by department, delete department, role, employee
// view total salaries of all employees in department
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

const answerHandler = async function (answer) {
    switch (answer.choice) {
        case "View all departments": {
            // TODO: add function call here from queries.js
            await viewDepartments();
            await askQuestion();
            break;
        }
        case "View all roles": {
            // TODO: add function call here from queries.js
            await viewRoles();
            await askQuestion();
            break;
        }
        case "View all employees": {
            // TODO: add function call here from queries.js
            await viewEmployees();
            await askQuestion();
            break;
        }
        case "Add a department": {
            // TODO: add function call here from queries.js
            await askQuestion();
            break;
        }
        case "Add a role": {
            // TODO: add function call here from queries.js
            await askQuestion();
            break;
        }
        case "Add an employee": {
            // TODO: add function call here from queries.js
            await askQuestion();
            break;
        }
        case "Update an employee role": {
            // TODO: add function call here from queries.js (bonus)
            await askQuestion();
            break;
        }
        default: {
            return;
        }
    }
}

const askQuestion = async function () {
    await inquire.prompt([{
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
            "Quit"
        ],
        name: "choice"
    }]).then((answer) => {
        answerHandler(answer);
    });
}
askQuestion();
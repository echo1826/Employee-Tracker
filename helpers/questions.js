const Database = require('./queries');
const inquire = require('inquirer');
const connection = require('./connection');
// inquirer questions to import into server.js for the add role, and add employee

async function addEmployee(answer) {
    
}

async function askEmployee() {

}

async function addRole(answer, departmentId) {
    const db = new Database(connection);
    await db.addNewRole(answer, departmentId);
}

async function askRole() {
    const db = new Database(connection);
    const departments = await db.viewAllDepartments();
    const departmentName = [];
    departmentName.push(...departments.map(object => object.name));
    console.log(departmentName);
    await inquire.prompt(
        [
            {
                type: 'input',
                message: 'Title of the role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What department should this role be in?',
                choices: departmentName,
                name: 'department'
            }
        ]
    ).then((answer) => {
        for(let i = 0; i < departmentName.length; i++) {
            if(departmentName[i] == answer.department) {
                let departmentId = departmentName.indexOf(departmentName[i]) + 1;
                console.log(departmentId);
                addRole(answer, departmentId);
            }
        }
        console.log("New role added.");
    })
}

async function addDepartment(answer) {
    const db = new Database(connection);
    await db.addNewDepartment(answer);
}

async function askDepartment() {
    await inquire.prompt(
        [
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'department'
            }
        ]
    ).then((answer) => {
        addDepartment(answer.department);
        console.log("New department added");
    })
}

async function viewEmployees() {
    const db = new Database(connection);
    const employees = await db.viewAllEmployees();
    console.table(employees);
}

async function viewRoles() {
    const db = new Database(connection);
    const roles = await db.viewAllRoles();
    console.table(roles);
}

async function viewDepartments() {
    const db = new Database(connection);
    const departments = await db.viewAllDepartments();
    console.table(departments);
}

module.exports = {askEmployee, askRole, askDepartment, viewEmployees, viewRoles, viewDepartments};
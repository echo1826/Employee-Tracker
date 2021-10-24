const Database = require('./queries');
const inquire = require('inquirer');
const connection = require('./connection');
const table = require('console.table');


// function handles the query to add employee given data from the user
async function addEmployee(answer, roleId, managerId) {
    const db = new Database(connection);
    await db.addNewEmployee(answer, roleId, managerId);
}
// questions to ask data to put into the database as a new employee
async function askEmployee() {
    // gets the existing employees to display as answer choices in the questions
    const db = new Database(connection);
    const employees = await db.viewAllEmployees();
    // gets the existing roles to display as answer choices in the questions
    const roles = await db.viewAllRoles();
    // makes arrays from the data gotten from the queries above to put into inquirer.prompt
    const roleNames = [];
    const employeeNames = [];
    employeeNames.push(...employees.map(object => {
        let firstName = object.first_name;
        let lastName = object.last_name;
        return firstName + " " + lastName;
    }), "None");
    roleNames.push(...roles.map(object => object.title));
    // console.log(employeeNames);
    await inquire.prompt(
        [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: 'firstName'
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "What role will this employee have?",
                choices: roleNames,
                name: "role"
            },
            {
                type: "list",
                message: "What manager will this employee report to?",
                choices: employeeNames,
                name: "manager"
            }
        ]
    ).then((answer) => {

        // sets managerId as NULL initially in case the user chooses no manager for the employee just made
        let managerId = 'NULL';
        // parses through the array to find out the id of given employee as a manager to be set into the database in the manager_id column
        if(answer.manager !== 'None') {
            for(let i = 0; i < employeeNames.length; i++) {
                if(employeeNames[i] == answer.manager) {
                    managerId = employeeNames.indexOf(employeeNames[i]) + 1;
                }
            }
        }
        let roleId;
        // parses through roles array to get the roleId from the title of the role
        for(let i = 0; i < roleNames.length; i++) {
            if(roleNames[i] == answer.role) {
                roleId = roleNames.indexOf(roleNames[i]) + 1;
            }
        }
        // function call passing in the parsed data and answers to make the query
        addEmployee(answer, roleId, managerId);
        console.log("Employee added.");
    })
}
// function handles the adding of a new role in the database
async function addRole(answer, departmentId) {
    const db = new Database(connection);
    await db.addNewRole(answer, departmentId);
}

async function askRole() {
    // gets the departments name and puts into an array to be used as an answer choice in the .prompt
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
        // parses the department name back into it's original id to be stored in the database
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
// deals with adding a new department in the database
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
// function to display all employees in database in a table
async function viewEmployees() {
    const db = new Database(connection);
    const employees = await db.viewAllEmployees();
    console.table(employees);
}
// function to display all roles in database in a table
async function viewRoles() {
    const db = new Database(connection);
    const roles = await db.viewAllRoles();
    console.table(roles);
}
// function to display all departments in database in a table
async function viewDepartments() {
    const db = new Database(connection);
    const departments = await db.viewAllDepartments();
    console.table(departments);
}

module.exports = {askEmployee, askRole, askDepartment, viewEmployees, viewRoles, viewDepartments};
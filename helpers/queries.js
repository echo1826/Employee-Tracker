const table = require('console.table');
const connection = require('./connection');
const Database = require('./database');

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

// function handles the adding of a new role in the database
async function addRole(answer, departmentId) {
    const db = new Database(connection);
    await db.addNewRole(answer, departmentId);
}

// function handles the query to add employee given data from the user
async function addEmployee(answer, roleId, managerId) {
    const db = new Database(connection);
    await db.addNewEmployee(answer, roleId, managerId);
}

// deals with adding a new department in the database
async function addDepartment(answer) {
    const db = new Database(connection);
    await db.addNewDepartment(answer);
}
// updates an employee's role id in the database
async function updateRoleQuery(roleId, employeeId) {
    const db = new Database(connection);
    let columnValues = [];
    columnValues.push(roleId, employeeId)
    await db.updateEmployeeRole(columnValues)
}

module.exports = {viewEmployees, viewRoles, viewDepartments, addRole, addEmployee, addDepartment, updateRoleQuery};
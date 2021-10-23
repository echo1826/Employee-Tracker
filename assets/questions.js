const Database = require('../db/queries');
const connection = require('../db/connection');
// inquirer questions to import into server.js for the add role, and add employee

async function addEmployee() {
    
}

async function addRole() {

}

async function addDepartment() {

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

module.exports = {addEmployee, addRole, addDepartment, viewEmployees, viewRoles, viewDepartments};
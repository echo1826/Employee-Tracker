// functions for queries...think about using a class and exporting the class to wrap 
// all the queries into one object and dot notation through them when needed

class Database {
    // connection represents the database connection for the query
    constructor(connection) {
        this.connection = connection;
    }
    // query to view all roles in database
    viewAllRoles() {
        return this.connection.query(
            // query commands go in here
            `SELECT employee_role.id, title, salary, name AS department_name FROM mafia_db.employee_role JOIN department ON department.id = employee_role.department_id ORDER BY employee_role.id;`
        )
    }
    // query to view all employees in database
    viewAllEmployees() {
        return this.connection.query(
            // query
            `SELECT employee.id, employee.first_name, employee.last_name, e.first_name as manager_first_name, e.last_name AS manager_last_name, title, salary, department.name AS department_name FROM employee JOIN employee_role ON employee.role_id = employee_role.id JOIN employee e ON e.id = employee.manager_id JOIN department ON employee_role.department_id = department.id ORDER BY employee.id;`
        )
    }
    // query to view all departments in database
    viewAllDepartments() {
        return this.connection.query(
            // query
            `SELECT * FROM mafia_db.department ORDER BY department.id;`
        )
    }
    viewByDepartment(departmentId) {
        return this.connection.query(
            `SELECT employee.first_name, employee.last_name, employee_role.title, department.name FROM employee_role JOIN employee ON employee.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id WHERE department_id = ?;`, departmentId
        )
    }
    // query to add new role to database
    addNewRole(answer, department) {
        // array to be accepted as argument in the query for the different variables for each column
        const answerArr = [];
        answerArr.push(answer.role, answer.salary, department);
        return this.connection.query(
            //query answer has to be an array before it's passed into here
            `INSERT INTO mafia_db.employee_role SET title = ?, salary = ?, department_id = ?;`, answerArr
        )
    }
    // query to add new employee to database
    addNewEmployee(answer, roleId, managerId) {
        // array to be accepted as argument in the query for the different variables for each column
        const answerArr = [];
        answerArr.push(answer.firstName, answer.lastName, roleId, managerId);
        return this.connection.query(
            //query
            `INSERT INTO mafia_db.employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?;`, answerArr
        )
    }
    // query to add new department to 
    addNewDepartment(answer) {
        return this.connection.query(
            //query
            `INSERT INTO mafia_db.department SET name = ?;`, answer
        )
    }
    // query to change the role id of an employee
    updateEmployeeRole(answer) {
        return this.connection.query(
            `UPDATE mafia_db.employee SET role_id = ? WHERE id = ?;`, answer
        )
    }
    getEmployeeManager() {
        return this.connection.query(
            `SELECT * FROM employee WHERE manager_id IS NOT NULL;`
        )
    }
    updateEmployeeManager(answer) {
        return this.connection.query(
            `UPDATE mafia_db.employee SET manager_id = ? WHERE first_name = ? AND last_name = ?;`, answer
        )
    }
}

module.exports = Database;
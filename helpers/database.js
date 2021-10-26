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
            `SELECT employee_role.id, title, salary, name AS department_name FROM mafia_db.employee_role JOIN department ON department.id = employee_role.department_id;`
        )
    }
    // query to view all employees in database
    viewAllEmployees() {
        return this.connection.query(
            //query
            `SELECT employee.id, first_name, last_name, title, salary, name AS department_name FROM employee JOIN employee_role ON employee.id = employee_role.id JOIN department WHERE department_id = department.id ORDER BY employee.id;`
        )
    }
    // query to view all departments in database
    viewAllDepartments() {
        return this.connection.query(
            //query
            `SELECT * FROM mafia_db.department;`
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
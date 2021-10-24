// functions for queries...think about using a class and exporting the class to wrap 
// all the queries into one object and dot notation through them when needed
class Database {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllRoles() {
        return this.connection.query(
            // query commands go in here
            `SELECT * FROM employee_role;`
        )
    };
    viewAllEmployees() {
        return this.connection.query(
            //query
            `SELECT * FROM employee;`
        )
    };
    viewAllDepartments() {
        return this.connection.query(
            //query
            `SELECT * FROM department;`
        )
    };
    addNewRole(answer, department) {
        const answerArr = [];
        answerArr.push(answer.role, answer.salary, department);
        return this.connection.query(
            //query answer has to be an array before it's passed into here
            `INSERT INTO mafia_db.employee_role SET title = ?, salary = ?, department_id = ?`, answerArr
        )
    };
    addNewEmployee(answer, roleId, managerId) {
        // TODO: push the different answers, roleId, managerId into an array for the query
        const answerArr = [];
        answerArr.push(answer.firstName, answer.lastName, roleId, managerId);
        return this.connection.query(
            //query
            `INSERT INTO mafia_db.employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?`, answerArr
        )
    }
    addNewDepartment(answer) {
        return this.connection.query(
            //query
            `INSERT INTO mafia_db.department SET name = ?`, answer
        )
    }
}

module.exports = Database;
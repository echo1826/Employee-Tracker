// functions for queries...think about using a class and exporting the class to wrap 
// all the queries into one object and dot notation through them when needed
class Database {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllRoles() {
        return this.connection.query(
            // query commands go in here
        )
    };
    viewAllEmployees() {
        return this.connection.query(
            //query
        )
    };
    viewAllDepartments() {
        return this.connection.query(
            //query
        )
    };
    addNewRole() {
        return this.connection.query(
            //query
        )
    };
    addNewEmployee() {
        return this.connection.query(
            //query
        )
    }
    addNewDepartment() {
        return this.connection.query(
            //query
        )
    }
}

module.exports = Database;
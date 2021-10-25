const Database = require('./database');
const inquire = require('inquirer');
const connection = require('./connection');
const {
    addEmployee,
    addDepartment,
    addRole,
    updateRoleQuery,
    updateManagerQuery
} = require('./queries')

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
        [{
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
        if (answer.manager !== 'None') {
            for (let i = 0; i < employeeNames.length; i++) {
                if (employeeNames[i] == answer.manager) {
                    managerId = employeeNames.indexOf(employeeNames[i]) + 1;
                }
            }
        }
        let roleId;
        // parses through roles array to get the roleId from the title of the role
        for (let i = 0; i < roleNames.length; i++) {
            if (roleNames[i] == answer.role) {
                roleId = roleNames.indexOf(roleNames[i]) + 1;
            }
        }
        // function call passing in the parsed data and answers to make the query
        addEmployee(answer, roleId, managerId);
        console.log("Employee added.");
    })
}

// function that deals with getting user input data to put into database
async function askRole() {
    // gets the departments name and puts into an array to be used as an answer choice in the .prompt
    const db = new Database(connection);
    const departments = await db.viewAllDepartments();
    const departmentName = [];
    departmentName.push(...departments.map(object => object.name));
    console.log(departmentName);
    await inquire.prompt(
        [{
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
        for (let i = 0; i < departmentName.length; i++) {
            if (departmentName[i] == answer.department) {
                let departmentId = departmentName.indexOf(departmentName[i]) + 1;
                console.log(departmentId);
                addRole(answer, departmentId);
            }
        }
        console.log("New role added.");
    })
}
// gets user input data for department they want to add into database
async function askDepartment() {
    await inquire.prompt(
        [{
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'department'
        }]
    ).then((answer) => {
        addDepartment(answer.department);
        console.log("New department added");
    })
}
// gets user data to update an employees role in the database
async function updateRole() {
    const db = new Database(connection);
    const employees = await db.viewAllEmployees();
    const employeeName = [];
    // parsing the data to display the employee name as a choice in the questions
    employeeName.push(...employees.map(object => {
        let firstName = object.first_name;
        let lastName = object.last_name;
        return firstName + " " + lastName;
    }))
    // parsing the data to display the job titles as a choice in the questions
    const roles = await db.viewAllRoles();
    const roleName = [];
    roleName.push(...roles.map(object => object.title));

    await inquire.prompt([{
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: employeeName,
        name: 'employee'
    }, {
        type: 'list',
        message: "Which role are they switching to?",
        choices: roleName,
        name: "role"
    }]).then((answer) => {
        // reparse the employee name and role name back to id format to be stored into database
        let employeeId;
        for (let i = 0; i < employeeName.length; i++) {
            if (employeeName[i] == answer.employee) {
                employeeId = employeeName.indexOf(employeeName[i]) + 1;
            }
        }
        let roleId;
        for (let i = 0; i < roleName.length; i++) {
            if (roleName[i] == answer.role) {
                roleId = roleName.indexOf(roleName[i]) + 1;
            }
        }
        updateRoleQuery(roleId, employeeId);
        console.log("Employee's role has been updated.");
    })
}

async function updateManager() {
    const db = new Database(connection);
    const employees = await db.getEmployeeManager();
    const employee = [];
    employee.push(...employees.map((object) => {
        return object.first_name + " " + object.last_name;
    }))
    const managers = await db.viewAllEmployees();
    const manager = [];
    manager.push(...managers.map((object) => {
        return object.first_name + " " + object.last_name;
    }))
    await inquire.prompt(
        [{
                type: "list",
                message: "Which employee do you want to change their manager?",
                choices: employee,
                name: "employee"
            },
            {
                type: "list",
                message: "Which manager should this employee report to?",
                choices: manager,
                name: "manager"
            }
        ]
    ).then((answer) => {
        let managerId;
        for(let i = 0; i < manager.length; i++) {
            if(manager[i] == answer.manager) {
                managerId = manager.indexOf(manager[i]) + 1;
            }
        }
        const answerArr = [];
        const nameArr = answer.employee.split(" ");
        answerArr.push(managerId, ...nameArr);
        updateManagerQuery(answerArr);
        console.log(answerArr);
    })
}

module.exports = {
    askEmployee,
    askRole,
    askDepartment,
    updateRole,
    updateManager
};
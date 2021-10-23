INSERT INTO department (name)
VALUES  ("Security"),
        ("Distribution"),
        ("Administration"),
        ("Laundering"),
        ("Production");
    
INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Boss", 4500000, 3),
        ("Underboss", 2000000, 3),
        ("Consigliere", 2100000, 3),
        ("Security Capo", 1000000, 1),
        ("Distribution Capo", 1000000, 2),
        ("Laundering Capo", 1000000, 4),
        ("Production Capo", 1000000, 5),
        ("Security Soldier", 500000, 1),
        ("Distribution Soldier", 500000, 2),
        ("Laundering Soldier", 500000, 4),
        ("Production Soldier", 500000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Al', "Capone", 1),
        ('Frank', "Nitti", 2),
        ("Antonio", "Lombardo", 3),
        ("James", "Indendino", 4),
        ("Peter", "DiFronzo", 5),
        ("Frank", "Caruso", 7),
        ("Albert", "Vena", 6),
        ("Michael", "Carisocia", 8),
        ("Robert", "Salerno", 9),
        ("Robert", "Bellavia", 10),
        ("Michael", "Giorango", 11);

UPDATE employee
SET manager_id = 1
WHERE role_id IN (2, 3);

UPDATE employee
SET manager_id = 2
WHERE role_id IN (4, 5, 6, 7);

UPDATE employee
SET manager_id = 4
WHERE role_id IN (8);

UPDATE employee
SET manager_id = 5
WHERE role_id IN (9);

UPDATE employee
SET manager_id = 6
WHERE role_id IN (10);

UPDATE employee
SET manager_id = 7
WHERE role_id IN (11);
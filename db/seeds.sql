INSERT INTO department (id, name)
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Al', "Capone", 1, NULL),
        ('Frank', "Nitti", 2, 1),
        ("Antonio", "Lombardo", 3, 1),
        ("James", "Indendino", 4, 2),
        ("Peter", "DiFronzo", 5, 2),
        ("Frank", "Caruso", 7, 2),
        ("Albert", "Vena", 6, 2),
        ("Michael", "Carisocia", 8, 4),
        ("Robert", "Salerno", 9, 5),
        ("Robert", "Bellavia", 10, 6),
        ("Michael", "Giorango", 11, 7);
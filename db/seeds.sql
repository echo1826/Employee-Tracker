INSERT INTO department (id, name)
VALUES  (1, "Security"),
        (2, "Distribution"),
        (3, "Administration"),
        (4, "Laundering"),
        (5, "Production");
    
INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Boss", 4500000, 3),
        ("Underboss", 2000000, 3),
        ("Consigliere", 2100000, 3),
        ("Strong Capo", 1000000, 1),
        ("Logistic Capo", 1000000, 2),
        ("Money Capo", 1000000, 4),
        ("Invent Capo", 1000000, 5),
        ("Strong Soldier", 500000, 1),
        ("Logistic Soldier", 500000, 2),
        ("Money Soldier", 500000, 4),
        ("Invent Soldier", 500000, 5);

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
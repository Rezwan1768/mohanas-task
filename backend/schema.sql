CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  department TEXT,
  status TEXT NOT NULL CHECK(status IN ('active', 'inactive', 'terminated')),
  created_on TEXT DEFAULT CURRENT_TIMESTAMP,
  modified_on TEXT DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES employees(id),
  modified_by INTEGER REFERENCES employees(id)
);


CREATE TABLE employee_ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  employee_id INTEGER NOT NULL REFERENCES employees(id),
  p_rating INTEGER CHECK(p_rating BETWEEN 1 AND 5),
  r_rating INTEGER CHECK(r_rating BETWEEN 1 AND 5),
  o_rating INTEGER DEFAULT 0,
  rating_period TEXT CHECK(rating_period IN ('Q1', 'Q2', 'Q3', 'Q4', 'H1', 'H2', 'Annual')),
  year INTEGER CHECK(year BETWEEN 2025 AND 2030) DEFAULT (strftime('%Y', 'now')),
  created_on TEXT DEFAULT CURRENT_TIMESTAMP,
  modified_on TEXT DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES employees(id),
  modified_by INTEGER REFERENCES employees(id)
);


CREATE TABLE rating_levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  value INTEGER UNIQUE NOT NULL,
  description TEXT UNIQUE NOT NULL
);

INSERT INTO rating_levels (value, description) VALUES
(1, 'Poor'),
(2, 'Fair'),
(3, 'Good'),
(4, 'Very Good'),
(5, 'Excellent');


INSERT INTO employees (employee_id, first_name, last_name, email, phone, department, status) VALUES
('E001', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'Engineering', 'active'),
('E002', 'Jane', 'Smith', 'jane.smith@example.com', '098-765-4321', 'Marketing', 'active'),
('E003', 'Michael', 'Brown', 'michael.brown@example.com', '222-333-4444', 'Finance', 'active'),
('E004', 'Emily', 'Johnson', 'emily.johnson@example.com', '555-666-7777', 'Engineering', 'inactive'),
('E005', 'David', 'Lee', 'david.lee@example.com', '888-999-0000', 'Human Resources', 'active');

INSERT INTO employee_ratings (employee_id, p_rating, r_rating, o_rating, rating_period, year) VALUES
(1, 4, 4, 4, 'Q1', 2025),
(1, 5, 5, 5, 'Annual', 2025),
(2, 3, 5, 4, 'Q2', 2026),
(2, 4, 4, 4, 'H1', 2026),
(3, 5, 4, 5, 'Q3', 2027),
(3, 5, 5, 5, 'Annual', 2027),
(4, 2, 3, 3, 'H2', 2028),
(4, 3, 4, 3, 'Annual', 2028),
(5, 4, 4, 5, 'Q4', 2029),
(5, 5, 5, 5, 'Annual', 2030);

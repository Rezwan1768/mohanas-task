import sqlite3
from fastapi import FastAPI

app = FastAPI()

DB_FILE = "app.db"

@app.get('/api/v1/employees')
async def get_employees():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM employees;")
    employees = cur.fetchall()
    column_names = [description[0] for description in cur.description]
    employees = [dict(zip(column_names, row)) for row in employees]
    conn.close()
    return {"employees": employees}

@app.get('/api/v1/employee_ratings')
async def get_employee_ratings():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM employee_ratings;")
    employee_ratings = cur.fetchall()
    conn.close()
    return {"employee_ratings": employee_ratings}

@app.get('/api/v1/rating_levels')
async def get_rating_levels():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM rating_levels;")
    rating_levels = cur.fetchall()
    conn.close()
    return {"rating_levels": rating_levels}
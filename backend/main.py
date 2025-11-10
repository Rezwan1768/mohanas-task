import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
from routers import employees 

app = FastAPI()

DB_FILE = "app.db"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router, prefix="/api/v1")

@app.get('/api/v1/employee_ratings')
async def get_employee_ratings():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute(
        "SELECT " \
            "er.id, " \
            "e.employee_id, " \
            "e.first_name || ' ' || e.last_name AS name, " \
            "er.p_rating, " \
            "er.r_rating, " \
            "er.o_rating, " \
            "er.rating_period, " \
            "er.year " \
        "FROM employee_ratings AS er " \
        "INNER JOIN employees AS e ON er.employee_id = e.id;")
    employee_ratings = cur.fetchall()
    column_names = [description[0] for description in cur.description]
    employee_ratings = [dict(zip(column_names, row)) for row in employee_ratings]
    conn.close()
    return {"employee_ratings": employee_ratings}

@app.get('/api/v1/rating_levels')
async def get_rating_levels():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    cur.execute("SELECT value, description FROM rating_levels;")
    rows = cur.fetchall()
    conn.close()

    # Convert to desired format
    rating_levels = {value: description for value, description in rows}

    return {"rating_levels": rating_levels}


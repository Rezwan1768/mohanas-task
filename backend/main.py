import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
from routers import employees 
from routers import employee_ratings

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
app.include_router(employee_ratings.router, prefix="/api/v1")


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


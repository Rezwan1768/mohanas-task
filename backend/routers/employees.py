from fastapi import APIRouter
from enum import Enum
from db import get_conn

router = APIRouter()

class EmployeeStatus(str, Enum):
    all = "All"
    active = "Active"
    inactive = "Inactive"
    terminated = "Terminated"

@router.get('/employees')
async def get_employees(name: str | None = None, id : str | None = None, status: EmployeeStatus | None = None):
    conn = get_conn()
    cur = conn.cursor()
    base_query = """
        SELECT
            id,
            employee_id,
            first_name || ' ' || last_name AS name,
            email,
            phone,
            department,
            status
        FROM employees
    """
    filters = []
    params = []

    # Dynamically build WHERE conditions
    if name:
        filters.append("(first_name || ' ' || last_name LIKE ?)")
        params.append(f"%{name}%")

    if id:
        filters.append("employee_id LIKE ?")
        params.append(f"%{id.upper()}%")

    if status and status != EmployeeStatus.all:
        filters.append("status = ?")
        params.append(status.value.lower())

    # Combine filters if any exist
    if filters:
        base_query += " WHERE " + " AND ".join(filters)

    cur.execute(base_query, params)
    employees = cur.fetchall()
    column_names = [description[0] for description in cur.description]
    employees = [dict(zip(column_names, row)) for row in employees]
    conn.close()
    return {"employees": employees}


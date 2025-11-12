from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from enum import Enum
from db import get_conn


router = APIRouter()

class EmployeeStatus(str, Enum):
    active = "active"
    inactive = "inactive"
    terminated = "terminated"

class EmployeeStatusFilter(str, Enum):
    all = "all"
    active = "active"
    inactive = "inactive"
    terminated = "terminated"

class EmployeeCreate(BaseModel):
    employee_id: str
    first_name: str
    last_name: str
    email: str 
    phone: str | None = None
    department: str | None = None
    status: EmployeeStatus

@router.get('/employees')
async def get_employees(name: str | None = None, id : str | None = None, status: EmployeeStatusFilter | None = None):
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

    if status and status != EmployeeStatusFilter.all:
        filters.append("status = ?")
        params.append(status.value)

    # Combine filters if any exist
    if filters:
        base_query += " WHERE " + " AND ".join(filters)

    cur.execute(base_query, params)
    employees = cur.fetchall()
    column_names = [description[0] for description in cur.description]
    employees = [dict(zip(column_names, row)) for row in employees]
    conn.close()
    return {"employees": employees}


@router.post("/employees")
async def create_employee(employee: EmployeeCreate):
    conn = get_conn()
    cur = conn.cursor()

    try:
        # Check for duplicate employee_id or email
        cur.execute(
            "SELECT 1 FROM employees WHERE employee_id = ? OR email = ?",
            (employee.employee_id.upper(), employee.email)
        )
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Employee already exists")

        # Insert employee
        cur.execute("""
            INSERT INTO employees (employee_id, first_name, last_name, email, phone, department, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            employee.employee_id.upper(),
            employee.first_name.strip(),
            employee.last_name.strip(),
            employee.email,
            employee.phone,
            employee.department,
            employee.status.lower()
        ))

        conn.commit()
        return {"message": "Employee added successfully"}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


@router.put("/employees/{employee_id}")
async def update_employee(employee_id: str, employee: EmployeeCreate):
    conn = get_conn()
    cur = conn.cursor()

    try:
        # Check if employee exists
        cur.execute("SELECT 1 FROM employees WHERE employee_id = ?", (employee_id.upper(),))
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Employee not found")

        # Check if the new email is already used by another employee
        cur.execute(
            "SELECT 1 FROM employees WHERE email = ? AND employee_id != ?",
            (employee.email, employee_id.upper())
        )
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already in use")

        # Update the employee
        cur.execute("""
            UPDATE employees
            SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ?, status = ?
            WHERE employee_id = ?
        """, (
            employee.first_name.strip(),
            employee.last_name.strip(),
            employee.email.strip(),
            employee.phone,
            employee.department,
            employee.status.value.lower(),
            employee_id.upper()  
        ))
        conn.commit()
        return {"message": "Employee updated successfully"}

    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@router.patch('/employees/{employee_id}')
async def terminate_employee(employee_id: str):
    conn = get_conn()
    cur = conn.cursor()

    try:
        cur.execute("SELECT 1 FROM employees WHERE employee_id = ?", (employee_id.upper(),))
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Employee not found")

        cur.execute("""
            UPDATE employees
            SET status = 'terminated'
            WHERE employee_id = ?
        """, (employee_id.upper(),))

        conn.commit()
        return {"message": "Employee status updated to 'terminated'"}

    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

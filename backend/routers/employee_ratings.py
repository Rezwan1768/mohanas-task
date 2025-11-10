from fastapi import APIRouter
from enum import Enum
from db import get_conn

router = APIRouter()

@router.get('/employee_ratings')
async def get_employee_ratings(
    name: str | None = None,
    id : str | None = None,
    rating_period: str | None = None,
    year: int | None = None,
):
    conn = get_conn()
    cur = conn.cursor()
    base_query = """
        SELECT
            er.id,
            e.employee_id,
            e.first_name || ' ' || e.last_name AS name,
            er.p_rating,
            er.r_rating,
            er.o_rating,
            er.rating_period,
            er.year
        FROM employee_ratings AS er
        INNER JOIN employees AS e
            ON er.employee_id = e.id
    """
    
    filters = []
    params = []

    if name:
        filters.append("(e.first_name || ' ' || e.last_name LIKE ?)")
        params.append(f"%{name}%")

    if id:
        filters.append("e.employee_id LIKE ?")
        params.append(f"%{id.upper()}%")

    if rating_period and rating_period != "All":
        filters.append("er.rating_period LIKE ?")
        params.append(f"%{rating_period.upper()}%")

    if year:
        filters.append("er.year = ?")
        params.append(year)

    if filters:
        base_query += " WHERE " + " AND ".join(filters)

    cur.execute(base_query, params)
    employee_ratings = cur.fetchall()
    column_names = [description[0] for description in cur.description]
    employee_ratings = [dict(zip(column_names, row)) for row in employee_ratings]
    conn.close()
    return {"employee_ratings": employee_ratings}
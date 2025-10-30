import sqlite3

# Connect to the database
conn = sqlite3.connect("app.db")
cur = conn.cursor()

# Show all tables
tables_to_check = ["employees", "employee_ratings", "rating_levels"]

for table in tables_to_check:
    print(f"\nData in '{table}':")
    cur.execute(f"SELECT * FROM {table};")
    rows = cur.fetchall()
    for row in rows:
        print(row)

conn.close()

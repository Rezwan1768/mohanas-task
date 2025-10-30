import sqlite3

def create_database():
    conn = sqlite3.connect("app.db")
    cur = conn.cursor()

    with open("schema.sql", "r") as f:
        sql_script = f.read()

    cur.executescript(sql_script)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
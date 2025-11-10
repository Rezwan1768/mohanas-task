import sqlite3

DB_FILE = "app.db"

def get_conn():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # optional: allows dict-like access
    return conn
import { useState, useEffect } from "react";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchEmployees() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data.employees)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { employees, error, loading };
}



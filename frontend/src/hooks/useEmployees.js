import { useState, useEffect } from "react";

export function useEmployees(name, employeeId, status, trigger ) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchEmployees() {
      try {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (employeeId) params.append("id", employeeId);
        if (status && status !== "All") params.append("status", status);
        console.log(params.toString());
        const url = `http://127.0.0.1:8000/api/v1/employees?${params.toString()}`;
        console.log(url);
        const response = await fetch(url);
        
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
  }, [trigger]);

  return { employees, error, loading };
}



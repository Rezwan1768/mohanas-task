import { useState, useEffect } from "react";

export function useEmployeeRating() {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchEmployees() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/employee_ratings");
        if (!response.ok) {
          throw new Error("Failed to fetch employee ratings");
        }

        const data = await response.json();
        setEmployeeRatings(data.employee_ratings)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { employeeRatings, error, loading };
}


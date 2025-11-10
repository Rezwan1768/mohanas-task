import { useState, useEffect } from "react";

export function useEmployeeRating(name, employeeId, ratingPeriod, year, trigger ) {
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchEmployees() {
      try {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (employeeId) params.append("id", employeeId);
        if (ratingPeriod) params.append("rating_period", ratingPeriod);
        if (year) params.append("year", year);
        const response = await fetch(`http://127.0.0.1:8000/api/v1/employee_ratings?${params.toString()}`);
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
  }, [trigger]);
  return { employeeRatings, error, loading };
}


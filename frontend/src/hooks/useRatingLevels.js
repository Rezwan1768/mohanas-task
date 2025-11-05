import { useState, useEffect } from "react";
export function useRatingLevels() {
  const [ratingLevels, setRatingLevels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchRatingLevels() {

      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/rating_levels");
        if (!response.ok) {
          throw new Error("Failed to fetch rating levels");
        }

        const data = await response.json();
        setRatingLevels(data.rating_levels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  return { ratingLevels, error, loading };
}
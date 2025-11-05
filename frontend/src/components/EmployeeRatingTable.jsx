import { useEmployeeRating } from "../hooks/useEmployeeRating";
import { useRatingLevels } from "../hooks/useRatingLevels";
import { Table } from './table';

export function EmployeeRatingTable() {
  const { employeeRatings, error, loading } = useEmployeeRating();
  const { ratingLevels, error: ratingLevelsError, loading: ratingLevelsLoading } = useRatingLevels();


  if (loading || ratingLevelsLoading) {
    return <div>Loading...</div>;
  }

  const dataWithDescriptions = employeeRatings.map(({rating_period, ...emp}) => ({
    ...emp,
    description: ratingLevels[emp.p_rating] || "N/A", // or r_rating
    rating_period
  }));


  const headings =
    dataWithDescriptions.length > 0
      ? Object.keys(dataWithDescriptions[0]).filter(key => key !== "id")
      : [];

  return <Table headings={headings} data={dataWithDescriptions} />;
}
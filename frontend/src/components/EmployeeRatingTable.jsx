import { useEmployeeRating } from "../hooks/useEmployeeRating";
import { useRatingLevels } from "../hooks/useRatingLevels";
import { Table } from './table';

export function EmployeeRatingTable() {
  const { employeeRatings, error, loading } = useEmployeeRating();
  const { ratingLevels, error: ratingLevelsError, loading: ratingLevelsLoading } = useRatingLevels();

  if (loading || ratingLevelsLoading) {
    return <div>Loading...</div>;
  }

  const combinedData = employeeRatings.map(({rating_period, year, o_rating,  ...emp}) => ({
    ...emp,
    description: ratingLevels[o_rating] || "N/A",
    rating_period,
    year
  }));

  console.log(combinedData);
  const columnLabels = {
    employee_id: "Employee ID",
    name: "Name",
    p_rating: "Performance Rating",
    r_rating: "Reliability Rating",
    description: "Rating Description",
    rating_period: "Rating Period",
    year: "Year"
  }

  const columns = Object.keys(columnLabels).map((key) => ({
    key,
    label: columnLabels[key]
  }))

  return <Table headings={columns} data={combinedData} />;
}
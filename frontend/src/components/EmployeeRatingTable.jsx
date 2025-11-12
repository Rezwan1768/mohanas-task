import { useState } from "react";
import { useEmployeeRating } from "../hooks/useEmployeeRating";
import { useRatingLevels } from "../hooks/useRatingLevels";
import { Table } from './table';
import { FilterForm } from './FilterForm';
import { SearchBox } from './SearchBox';
import { Dropdown } from "./Dropdown";
import classes from '../styles/EmployeesTable.module.css';

export function EmployeeRatingTable() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [ratingPeriod, setRatingPeriod] = useState("All");
  const [year, setYear] = useState("");
  const [trigger, setTrigger] = useState(0);

  const { employeeRatings, error, loading } = useEmployeeRating(name, id, ratingPeriod, year, trigger);
  const { ratingLevels, error: ratingLevelsError, loading: ratingLevelsLoading } = useRatingLevels();

  function handleSubmit(e) {
    e.preventDefault();
    setTrigger(trigger + 1);
  }

  if (loading || ratingLevelsLoading) {
    return <div>Loading...</div>;
  }

  const combinedData = employeeRatings.map(({ rating_period, year, o_rating, ...emp }) => ({
    ...emp,
    description: ratingLevels[o_rating] || "N/A",
    rating_period,
    year
  }));

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

  const valid_rating_periods = ["All","Q1", "Q2", "Q3", "Q4", "H1", "H2", "Annual"];
  return (
    <>
      <FilterForm onSubmit={handleSubmit}>
        <SearchBox label="Name" value={name} setValue={setName} />
        <SearchBox label="Emp ID" value={id} setValue={setId} />
        <Dropdown label="Rating" values={valid_rating_periods} value={ratingPeriod} setValue={setRatingPeriod} />
        <SearchBox label="Year" value={year} setValue={setYear} />
        <button type="submit" className={classes.button}>
          Search
        </button>
      </FilterForm>
      <Table headings={columns} data={combinedData} />
    </>
  );

}
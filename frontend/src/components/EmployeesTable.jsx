import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { Table } from './table';
import { SearchBox } from "./SearchBox";
import { Dropdown } from "./Dropdown";
import { FilterForm } from "./FilterForm";
import classes from '../styles/EmployeesTable.module.css';

export function EmployeesTable() {

  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("All");
  const [trigger, setTrigger] = useState(0);

  const { employees, error, loading } = useEmployees(name, employeeId, status, trigger);

  function handleSubmit(e) {
    e.preventDefault();
    setTrigger(trigger + 1);
  }

  const columnLabels = {
    employee_id: "Employee ID",
    name: "Name",
    email: "Email",
    phone: "Phone",
    department: "Department",
    status: "Status"
  }

  const columns = Object.keys(columnLabels).map((key) => ({
    key,
    label: columnLabels[key]
  }))

  if (loading) {
    return <div>Loading...</div>;
  }

  const valid_statuses = ["All", "Active", "Inactive", "Terminated"];
  return (
    <>
      <FilterForm onSubmit={handleSubmit}>
        <SearchBox searchTerm={name} setSearchTerm={setName} label="Name" />
        <SearchBox searchTerm={employeeId} setSearchTerm={setEmployeeId} label="ID" />
        <Dropdown label="Status" values={valid_statuses} value={status} setValue={setStatus} />
        <button type="submit" className={classes.button}>
          Search
        </button>
      </FilterForm>
      <Table headings={columns} data={employees} />
    </>
  )
}

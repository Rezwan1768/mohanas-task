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
  const [status, setStatus] = useState("all");
  const [trigger, setTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    status: "active"
  })

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

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

  const valid_statuses = ["all", "active", "inactive", "terminated"];
  return (
    <>
      <FilterForm onSubmit={handleSubmit}>
        <SearchBox label="Name" value={name} setValue={setName} />
        <SearchBox label="Emp ID" value={employeeId} setValue={setEmployeeId} />
        <Dropdown label="Status" values={valid_statuses} value={status} setValue={setStatus} />
        <button type="submit" className={classes.button}>
          Search
        </button>
      </FilterForm>
      <button type="button" onClick={() => setShowForm(true)}>
        Add Employee
      </button>
      {showForm &&
        <form>
          <label htmlFor="employeeId">Employee ID:</label>
          <input id="employeeId" name="employeeId" type="text" value={formData.employeeId} onChange={handleFormChange} />
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleFormChange} />
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleFormChange} />
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleFormChange} />
          <label htmlFor="phone">Phone:</label>
          <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleFormChange} />
          <label htmlFor="department">Department:</label>
          <input id="department" name="department" type="text" value={formData.department} onChange={handleFormChange} />
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleFormChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="terminated">Terminated</option>
          </select>
        </form>}

      <Table headings={columns} data={employees} />
    </>
  )
}

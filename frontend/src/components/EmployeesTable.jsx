import { useEmployees } from "../hooks/useEmployees";
import { Table } from './table';

export function EmployeesTable() {
  const { employees, error, loading } = useEmployees();

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

  return (
    <Table headings={columns} data={employees} />
  )
}

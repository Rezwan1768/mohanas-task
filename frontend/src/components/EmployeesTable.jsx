import { useEmployees } from "../hooks/useEmployees";
import { Table } from './table';

export function EmployeesTable() {
  const { employees, error, loading } = useEmployees();
  const headings = employees.length > 0
  ? Object.keys(employees[0]).filter(key => key !== "id")
  : [];
  console.log(employees)

   if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table headings={headings} data={employees} />
  )
}

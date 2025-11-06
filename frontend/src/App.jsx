import { Outlet, Link } from "react-router"
export function App() {
  return (
    <>
      <nav>
        <Link to="/employees">Employees</Link>
        <Link to="/employee-ratings">Employee Ratings</Link>
      </nav>
      <Outlet />
    </>
  )
}
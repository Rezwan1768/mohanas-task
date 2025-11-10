import { Outlet, Link } from "react-router"
export function App() {
  return (
    <>
      <nav>
        <Link to="/">Employees</Link>
        <Link to="/employee-ratings">Employee Ratings</Link>
      </nav>
      <Outlet />
    </>
  )
}
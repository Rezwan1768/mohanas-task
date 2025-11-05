import { useState } from 'react'
import { EmployeesTable } from './components/EmployeesTable'
import { EmployeeRatingTable } from './components/EmployeeRatingTable'
export function App() {
  return (
    <>
      <EmployeesTable />
      <EmployeeRatingTable />
    </>
  )
}
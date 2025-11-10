import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { EmployeesTable } from './components/EmployeesTable'
import { EmployeeRatingTable } from './components/EmployeeRatingTable'
import { App } from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<EmployeesTable />} />
          <Route path="employee-ratings" element={<EmployeeRatingTable />} />
        </Route>
      </Routes>
    </BrowserRouter >
  </StrictMode >,
)

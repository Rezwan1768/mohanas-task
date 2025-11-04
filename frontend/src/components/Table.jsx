export function Table({headings, data}) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((heading) => {
            return <th key={heading}>{heading}</th>
          })}
        </tr>
      </thead>
      <tbody>
          {data.map((employee) => {
            return (
              <tr key={employee.id}>
                {headings.map((heading) => {
                  return <td key={heading}>{employee[heading]}</td>
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
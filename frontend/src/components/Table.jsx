export function Table({headings, data}) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((heading) => {
            return <th key={heading.key}>{heading.label}</th>
          })}
        </tr>
      </thead>
      <tbody>
          {data.map((employee) => {
            return (
              <tr key={employee.id}>
                {headings.map((heading) => {
                  return <td key={heading.key}>{employee[heading.key]}</td>
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export function TestTable({headings, data}) {
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
          {data.map((rating) => {
            return (
              <tr key={rating.id}>
                {headings.map((heading) => {
                  return <td key={heading}>{rating[heading]}</td>
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
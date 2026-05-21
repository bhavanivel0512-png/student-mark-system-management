import { useEffect, useState } from 'react'

function Results() {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadResults = async () => {
      try {

        const res = await fetch( 
'https://student-mark-system-management.onrender.com/api/students',
          { cache: "no-store" }
        )

        const data = await res.json()

        console.log("RESULT DATA:", data)

        setStudents(Array.isArray(data) ? data : [])

      } catch (err) {
        console.log(err)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    loadResults()

  }, [])

  const calculateResult = (mark = {}) => {

    const total =
      (mark.tamil || 0) +
      (mark.english || 0) +
      (mark.maths || 0) +
      (mark.science || 0) +
      (mark.social || 0)

    const percentage = (total / 500) * 100

    let grade = ''

    if (percentage >= 90) grade = 'A+'
    else if (percentage >= 80) grade = 'A'
    else if (percentage >= 70) grade = 'B'
    else if (percentage >= 60) grade = 'C'
    else if (percentage >= 35) grade = 'D'
    else grade = 'F'

    const status = percentage >= 35 ? 'Pass ✅' : 'Fail ❌'

    return { total, percentage: percentage.toFixed(2), grade, status }
  }

  return (
    <div style={{ padding: '20px' }}>

      <h2>Results</h2>

      {loading ? (
        <p>Loading results...</p>
      ) : (

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Tamil</th>
              <th>English</th>
              <th>Maths</th>
              <th>Science</th>
              <th>Social</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {students.length === 0 ? (
              <tr>
                <td colSpan="11">No Data Found</td>
              </tr>
            ) : (
              students.map((s) => {

                const result = calculateResult(s.mark)

                return (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.rollno}</td>
                    <td>{s.mark?.tamil || 0}</td>
                    <td>{s.mark?.english || 0}</td>
                    <td>{s.mark?.maths || 0}</td>
                    <td>{s.mark?.science || 0}</td>
                    <td>{s.mark?.social || 0}</td>
                    <td>{result.total}</td>
                    <td>{result.percentage}%</td>
                    <td>{result.grade}</td>
                    <td>{result.status}</td>
                  </tr>
                )

              })
            )}

          </tbody>

        </table>

      )}

    </div>
  )
}

export default Results
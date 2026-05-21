import { useEffect, useState } from 'react'

function Dashboard() {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStudents = async () => {
    try {

      const res = await fetch(
        'https://student-mark-backend.onrender.com/api/students',
        { cache: "no-store" }
      )

      const data = await res.json()

      console.log("API DATA:", data)

      setStudents(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log("ERROR:", err)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    const load = async () => {

      setLoading(true)

      // render wake-up delay safe
      await new Promise(r => setTimeout(r, 3000))

      fetchStudents()
    }

    load()

  }, [])

  return (
    <div style={{ padding: '20px' }}>

      <h2>Dashboard</h2>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <>
          <p>Total Students: {students.length}</p>

          <table border="1" cellPadding="10" width="100%">

            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
              </tr>
            </thead>

            <tbody>

              {students.length === 0 ? (
                <tr>
                  <td colSpan="3">No Students Found</td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.rollno}</td>
                    <td>{s.class}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </>
      )}

    </div>
  )
}

export default Dashboard
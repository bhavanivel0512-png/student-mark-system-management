import { useEffect, useState } from 'react'

function EnterMarks() {

  const [students, setStudents] = useState([])
  const [selectedId, setSelectedId] = useState('')

  const [marks, setMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  })

  useEffect(() => {

    const loadStudents = async () => {
      try {

        await new Promise(r => setTimeout(r, 3000))

        const res = await fetch(
          'https://student-mark-backend.onrender.com/api/students',
          { cache: "no-store" }
        )

        const data = await res.json()

        console.log("DROPDOWN DATA:", data)

        setStudents(Array.isArray(data) ? data : [])

      } catch (err) {
        console.log(err)
        setStudents([])
      }
    }

    loadStudents()

  }, [])

  const handleChange = (e) => {
    setMarks({
      ...marks,
      [e.target.name]: Number(e.target.value)
    })
  }

  const handleSubmit = async () => {

    if (!selectedId) {
      alert("Select student")
      return
    }

    try {

      await fetch(
        `https://student-mark-backend.onrender.com/api/students/${selectedId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mark: marks })
        }
      )

      alert("Marks saved")

      setMarks({
        tamil: '',
        english: '',
        maths: '',
        science: '',
        social: ''
      })

      setSelectedId('')

    } catch (err) {
      console.log(err)
      alert("Error saving marks")
    }

  }

  return (
    <div>

      <h2>Enter Marks</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select Student</option>

        {students.length === 0 ? (
          <option disabled>No Students</option>
        ) : (
          students.map(s => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))
        )}

      </select>

      <br /><br />

      <input name="tamil" placeholder="Tamil" onChange={handleChange} />
      <br /><br />

      <input name="english" placeholder="English" onChange={handleChange} />
      <br /><br />

      <input name="maths" placeholder="Maths" onChange={handleChange} />
      <br /><br />

      <input name="science" placeholder="Science" onChange={handleChange} />
      <br /><br />

      <input name="social" placeholder="Social" onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>Save</button>

    </div>
  )
}

export default EnterMarks
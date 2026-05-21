import { useState } from 'react'

function AddStudent() {

  const [form, setForm] = useState({
    name: '',
    rollno: '',
    class: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {

      const res = await fetch(
        'https://student-mark-backend.onrender.com/api/students',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        }
      )

      const data = await res.json()
      console.log(data)

      alert('Student added')

      setForm({ name: '', rollno: '', class: '' })

    } catch (err) {
      console.log(err)
      alert('Error')
    }
  }

  return (
    <div>

      <h2>Add Student</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <br /><br />

      <input name="rollno" placeholder="Roll No" value={form.rollno} onChange={handleChange} />
      <br /><br />

      <input name="class" placeholder="Class" value={form.class} onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit}>Add</button>

    </div>
  )
}

export default AddStudent
import { useEffect, useState } from 'react'

function Dashboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', rollno: '', class: '' })

  const fetchStudents = async () => {
    try {
      const res = await fetch('https://student-mark-system-management.onrender.com/api/students', { cache: 'no-store' })
      const data = await res.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log(err)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await new Promise(r => setTimeout(r, 3000))
      fetchStudents()
    }
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete பண்ணணுமா?')) return
    try {
      await fetch(`https://student-mark-system-management.onrender.com/api/students/${id}`, { method: 'DELETE' })
      alert('Deleted!')
      fetchStudents()
    } catch (err) {
      alert('Delete Error!')
    }
  }

  const handleEditClick = (s) => {
    setEditId(s._id)
    setEditForm({ name: s.name, rollno: s.rollno, class: s.class })
  }

  const handleEditSave = async () => {
    try {
      const existing = students.find(s => s._id === editId)
      const res = await fetch(`https://student-mark-system-management.onrender.com/api/students/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editForm.name, rollno: editForm.rollno, class: editForm.class, mark: existing.mark })
      })
      const data = await res.json()
      console.log('UPDATED:', data)
      alert('Updated!')
      setEditId(null)
      fetchStudents()
    } catch (err) {
      console.log(err)
      alert('Update Error!')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div>
          <p>Total Students: {students.length}</p>
          <table border="1" cellPadding="10" width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4">No Students Found</td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s._id}>
                    {editId === s._id ? (
                      <React.Fragment>
                        <td><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></td>
                        <td><input value={editForm.rollno} onChange={(e) => setEditForm({ ...editForm, rollno: e.target.value })} /></td>
                        <td><input value={editForm.class} onChange={(e) => setEditForm({ ...editForm, class: e.target.value })} /></td>
                        <td>
                          <button onClick={handleEditSave}>Save</button>
                          <button onClick={() => setEditId(null)}>Cancel</button>
                        </td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td>{s.name}</td>
                        <td>{s.rollno}</td>
                        <td>{s.class}</td>
                        <td>
                          <button onClick={() => handleEditClick(s)}>Edit</button>
                          <button onClick={() => handleDelete(s._id)}>Delete</button>
                        </td>
                      </React.Fragment>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard
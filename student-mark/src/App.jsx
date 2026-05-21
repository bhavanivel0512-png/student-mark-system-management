import { useState } from 'react'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import EnterMarks from './components/EnterMarks'
import Results from './components/Results'
import './App.css'

function App() {

  const [page, setPage] = useState('dashboard')

  return (
    <div>

      {/* NAVIGATION */}
      <nav>

        <button onClick={() => setPage('dashboard')}>
          Dashboard
        </button>

        <button onClick={() => setPage('add')}>
          Add Student
        </button>

        <button onClick={() => setPage('marks')}>
          Enter Marks
        </button>

        <button onClick={() => setPage('results')}>
          Results
        </button>

      </nav>

      {/* PAGES */}
      <div style={{ padding: '20px' }}>

        {page === 'dashboard' && <Dashboard />}

        {page === 'add' && <AddStudent />}

        {page === 'marks' && <EnterMarks />}

        {page === 'results' && <Results />}

      </div>

    </div>
  )
}

export default App
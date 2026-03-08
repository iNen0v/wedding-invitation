import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Invitation from './pages/Invitation'
import Questionnaire from './pages/Questionnaire'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Invitation />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


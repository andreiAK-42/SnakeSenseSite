import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './views/Login.jsx'
import Dashboard from './views/Dashboard.jsx'
import Sensors from './views/Sensors.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors" element={<Sensors />} />
      </Routes>
    </Router>
    
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx'
import Sensors from './views/Sensors.jsx'
import Notification from './views/Notification.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router> 
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './views/Login.jsx'
import Dashboard from './views/Dashboard.jsx'
import Sensors from './views/Sensors.jsx'
import Profile from './views/Profile.jsx'
import Api from './views/Api.jsx'
import Notification from './views/Notification.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/api" element={<Api />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </Router>
    
  )
}

export default App

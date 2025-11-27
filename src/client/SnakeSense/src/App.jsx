import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './views/dashboard/dashboard.jsx'
import Sensors from './views/sensors/sensors.jsx'
import Notifications from './views/notifications/notifications.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App

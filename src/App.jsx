import { Routes, Route } from 'react-router-dom'
import PublicTemplate from './pages/PublicTemplate'
import AdminDashboard from './pages/AdminDashboard'
import Inscription from './pages/Inscription'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicTemplate />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App

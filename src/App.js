import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Staff from './pages/staff/Staff';
function App() {
  return (
    <Routes>
      <Route path="admin" element={<Admin />} />
      <Route path="staff" element={<Staff />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import các page components (tạo mới nếu chưa có)
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminPage from './pages/admin/AdminPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation bar để test */}
        <nav style={{ 
          padding: '10px 20px', 
          background: '#f0f0f0', 
          borderBottom: '1px solid #ccc',
          display: 'flex',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>🏠 Home</Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>🔐 Login</Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>📝 Register</Link>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>⚙️ Admin</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <nav style={{ 
        padding: '10px', 
        background: '#333', 
        color: '#fff', 
        display: 'flex', 
        gap: '15px',
        alignItems: 'center' 
      }}>
        <strong style={{ marginRight: 'auto' }}>My E-Commerce</strong>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

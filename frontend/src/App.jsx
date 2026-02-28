import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    alert('Logged Out');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff', display: 'flex', gap: '15px', alignItems: 'center' }}>
      <strong style={{ marginRight: 'auto' }}>My E-Commerce</strong>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
      
      {isAuthenticated ? (
        <>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
          <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    alert('Logged Out Successfully');
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '10px 20px', 
      background: '#333', 
      color: '#fff', 
      display: 'flex', 
      gap: '15px', 
      alignItems: 'center' 
    }}>
      <strong style={{ marginRight: 'auto', fontSize: '1.2rem' }}>My E-Commerce</strong>
      
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
      
      {isAuthenticated ? (
        <>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
          <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
          <Link to="/admin-dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: '#e74c3c', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '5px 12px',
              borderRadius: '4px'
            }}
          >
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
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <footer style={{ textAlign: 'center', padding: '20px', background: '#f4f4f4', marginTop: '20px' }}>
        <p>&copy; 2026 E-Commerce Store</p>
      </footer>
    </Router>
  );
}

export default App;

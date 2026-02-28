import React, { useState, useEffect } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('access'));
    };
    

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false); // স্টেট আপডেট
    alert('Logged Out Successfully');
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '10px 20px', 
      background: '#2c3e50', 
      color: '#fff', 
      display: 'flex', 
      gap: '20px', 
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <strong style={{ marginRight: 'auto', fontSize: '1.4rem', color: '#ecf0f1' }}>
        My E-Commerce
      </strong>
      
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
      
      {isLoggedIn ? (
        <>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart</Link>
          <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
          <Link to="/admin-dashboard" style={{ color: '#fff', textDecoration: 'none', background: '#f39c12', padding: '4px 8px', borderRadius: '4px' }}>Admin</Link>
          <button 
            onClick={handleLogout} 
            style={{ 
              background: '#e74c3c', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '6px 15px',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '4px 10px', borderRadius: '4px' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '85vh', padding: '20px' }}>
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
      <footer style={{ 
        textAlign: 'center', 
        padding: '25px', 
        background: '#ecf0f1', 
        marginTop: '30px',
        borderTop: '1px solid #bdc3c7'
      }}>
        <p style={{ margin: 0, color: '#7f8c8d' }}>&copy; 2026 E-Commerce Store | Developed with React & Django</p>
      </footer>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to My E-Commerce Store</h1>
        <Routes>
          <Route path="/" element={<div>Product List Coming Soon...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
        <strong>My E-Commerce</strong>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;




function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#333', color: '#fff', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

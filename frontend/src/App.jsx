import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

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

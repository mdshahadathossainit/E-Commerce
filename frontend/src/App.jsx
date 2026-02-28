import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

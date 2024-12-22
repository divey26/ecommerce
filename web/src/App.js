import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Bun from './com/Bun'
import CategoryPage from './com/Category';

import Dashboard from './com/dashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Bread/>} />
        <Route path="/bun" element={<Bun/>} />
      
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/category" element={<CategoryPage/>} />

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;

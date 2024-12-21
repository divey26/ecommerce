import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Bun from './com/Bun'

import Dashboard from './com/dashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Bread/>} />
        <Route path="/bun" element={<Bun/>} />
      
        <Route path="/dashboard" element={<Dashboard/>} />

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from './com/Category/Category';

import ProductPage from './com/Products';
import Dashboard from './com/dashboard'
import Shorts from './com/Shorts/Shorts'
import Timer from './com/Timer/Timer'
import Summa from './com/summa';
import View from './com/Summa/front'
import Add from './com/Summa/admin'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Summa/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/category" element={<CategoryPage/>} />
        <Route path="/shorts" element={<Shorts/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/add-product" element={<ProductPage/>} />
        <Route path="/view" element={<View/>} />
        <Route path="/add" element={<Add/>} />

         

        </Routes>
      </Router>
    </div>
  );
}

export default App;

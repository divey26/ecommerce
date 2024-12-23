import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bread from './com/Bread'
import Bun from './com/Bun'
import CategoryPage from './com/Category/Category';

import ProductPage from './com/Products';


import Dashboard from './com/dashboard'


import Summa from './com/Products'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Bread/>} />
        <Route path="/bun" element={<Bun/>} />
      
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/category" element={<CategoryPage/>} />


        <Route path="/summa" element={<Summa/>} />

        <Route path="/add-product" element={<ProductPage/>} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;

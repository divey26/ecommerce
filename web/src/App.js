import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './com/Auth/login'

import CategoryPage from './com/Category/Category';
import ProductPage from './com/Products';
import StartPage from './com/StartPage'
import Shorts from './com/Shorts/Shorts'
import Timer from './com/Timer/Timer'
import HomeLayoutPage from './com/HomePage/HomeLayout'

import Sellersign from "../../web/src/com/seller/sellerSignup";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dash" element={<StartPage/>} />
        <Route path="/category" element={<CategoryPage/>} />
        <Route path="/shorts" element={<Shorts/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/add-product" element={<ProductPage/>} />
        <Route path="/add" element={<HomeLayoutPage/>} />

        <Route path="/sellerS" element={<Sellersign />} />
      

        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './utils/AuthContext';
import { CartProvider } from './common/cart/CartContext'; // Import CartContext

import About from "./common/About";
import HomePage from './common/Home/HomePage';
import Login from "./common/Auth/Login";
import Sign from "./common/Auth/Sign";
import Banner from "./common/Home/banner";
import All from "./common/Products/AllProducts";
import CartView from "./common/cart/CartView";
import Summa from "./utils/summa";

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap entire app with CartProvider */}
        <div className="App">
          <Router>
            <Routes>
              <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
              <Route path="/about" element={<ProtectedRoute Component={About} />} />
              <Route path="/" element={<Login />} />
              <Route path="/sign" element={<Sign />} />
              <Route path="/ban" element={<Banner />} />
              <Route path="/wat" element={<All />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/summa" element={<Summa />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

// ProtectedRoute component to check authentication before rendering the component
const ProtectedRoute = ({ Component }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Component /> : <Navigate to="/" />;
};

export default App;

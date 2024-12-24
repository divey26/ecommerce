import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import About from "./common/About"
import HomePage from './common/Home/HomePage';
import Login from "./common/Auth/Login" 
import Sign from "./common/Auth/Sign" 

import { CartProvider } from './common/cart/Cartcontext';
import Banner from "./common/Home/banner" 

import All from "./common/Products/AllProducts" 
import Cart from "./common/cart/Cart";


function App() {

  const isAdminAuthenticated = () => {
    return true;
  };
  
  return (
    <div className="App">
        <CartProvider>

      <Router>
        <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route
           path="/home" 
           element={
          isAdminAuthenticated() ? <HomePage /> : <Navigate to="/" />
        }
        />
          <Route
          path="/about"
          element={
            isAdminAuthenticated() ? <About /> : <Navigate to="/" />
          }
        />
        <Route path='/' element={<Login/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/ban' element={<Banner/>}/>
        <Route path='/wat' element={<All/>}/>
        <Route path="/cart" element={<Cart userId={localStorage.getItem("userId")} />} />
        </Routes>
      </Router>
      </CartProvider>

    </div>
  );
}

export default App;

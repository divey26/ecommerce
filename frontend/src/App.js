import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import About from "./common/About"
import HomePage from './common/Home/HomePage';
import Login from "./common/Auth/Login" 
import Sign from "./common/Auth/Sign" 

//import { CartProvider } from './common/cart/Cartcontext';
import Banner from "./common/Home/banner" 

import All from "./common/Products/AllProducts" 

import CartView from "./common/cart/CartView"

function App() {

  const isAdminAuthenticated = () => {
    return true;
  };
  
  return (
    <div className="App">
       

      <Router>
        <Routes>
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


        <Route path="/cart" element={<CartView />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import About from "./common/About"
import HomePage from './common/HomePage';
import Login from "./common/Login" 
import Sign from "./common/Sign" 
import Cart from './common/Cart';
import { CartProvider } from './common/CartContext';
import Banner from "./common/banner" 
import Timer from "./common/summa" 

import All from "./common/Products/AllProducts" 


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
        <Route path='/tim' element={<Timer/>}/>


        <Route path='/wat' element={<All/>}/>


       </Routes>
      </Router>
      </CartProvider>

    </div>
  );
}

export default App;

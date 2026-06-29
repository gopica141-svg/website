import React, { useState,useEffect } from "react";
import Home from "./Home";
import Sweets from "./Sweet";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Details from "./Details";
import Header from "./Header";
import CollectionPage from './CollectionPage';
import Register from "./Register";
import About from "./About";
import SweetDetails from "./SweetDetails";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Checkout from './Checkout';
import DryFruits from './DryFruits';
import ItemDetails from "./ItemDetails.jsx";
import ViewAll from "./ViewAll.jsx";
import ScrollToTop from "./ScrollToTop";




 
 function App() {
  //const [page, setPage] = useState("home");
  // const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    
    localStorage.setItem('isAuthenticated', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
    
 
   
      
       <ScrollToTop/> 
      <Routes>
       {/* Basic Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
 <Route path="/cart" element={<Cart cartItems={cartItems} />} />
<Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
  <Route path="/about" element={<About />} />

  <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
  <Route path="/details/:id" element={<Details />} />

  {/* Category & Product Routes */}
  <Route path="/sweets" element={<Sweets />} />
  <Route path="/dry-fruits" element={<DryFruits />} />
  
  
  {/* Category Collection Page */}
  <Route path="/collections/:slug" element={<CollectionPage />} />
  
  {/* Detailed Product Page (Best practice: use SweetDetails for both) */}
  <Route path="/collections/:slug/item-details/:id" element={<SweetDetails />} />
  <Route path="/sweets/:id" element={<SweetDetails />} />
  <Route path="/view-all" element={<ViewAll />} />
  {/* Utility Components (These usually shouldn't be routes, but if you need them:) */}
  <Route path="/header" element={<Header />} />
  <Route path="/footer" element={<Footer />} />
      </Routes>
     
      

            

      
    </>

  );
}
export default App

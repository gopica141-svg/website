import React, { useState,useEffect } from "react";
import Home from "./Home";
import Sweets from "./sweets";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Details from "./Details";
import Header from "./Header";
import Footer from "./footer";
import Login from "./login";
import Register from "./register";
import About from "./About";
import SweetDetails from "./SweetDetails.jsx";

export default function App() {
  //const [page, setPage] = useState("home");
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    
    localStorage.setItem('isAuthenticated', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
 
      {/* {page === "home" && <Home setPage={setPage} />}
      {page === "sweets" && <Sweets setPage={setPage} />} */}
      
      
      
        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sweets" element={<Sweets />} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/sweets/:id" element={<SweetDetails/>} />
      </Routes>
      

            

      
    </>

  );
}

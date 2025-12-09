import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0);

  
  
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartQuantity(total);
  }, []);

  
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartQuantity(total);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); 
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/register');
  const handleCartClick = () => navigate('/cart');
  const handleaboutClick =() => navigate('/about')

  return (
    <>
      <div className="bg-danger text-light p-2 text-center">
        Deliveries in Chennai may take upto 3 Days. For same day deliveries please order on Swiggy or Zomato.
      </div>
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand href="#" style={{ color: '#b7954b', fontWeight: 600 }}
          onClick={()=>navigate("/")}>
            ANAND <span className="fs-6" style={{ color: '#6d5028' }}>SWEETS &amp; SAVOURIES</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto fw-bold">
              <NavDropdown title="Shop All" id="shopAll-dropdown">
                <NavDropdown.Item onClick={() => navigate("/sweets")}>Sweets</NavDropdown.Item>
                <NavDropdown.Item>Dry Fruits</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={() => navigate("/sweets")}>Sweets</Nav.Link>
              <Nav.Link>Dry Fruits</Nav.Link>
              <Nav.Link>Gifting</Nav.Link>
              <Nav.Link onClick={handleaboutClick}>About Us</Nav.Link>
            </Nav>

            <Nav className="align-items-center">
              <Nav.Link onClick={handleCartClick} className="me-3 position-relative">
                <FaShoppingCart
                  size={24}
                  style={{
                    cursor: "pointer",
                    color: "#d21d19ff",
                    verticalAlign: "middle",
                  }}
                  title="View Cart"
                />
                {cartQuantity > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      fontSize: "0.7rem",
                    }}
                  >
                    {cartQuantity}
                  </Badge>
                )}
              </Nav.Link>

              {isLoggedIn ? (
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
                  <button className="btn btn-outline-dark ms-2" onClick={handleRegisterClick}>
                    Register
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

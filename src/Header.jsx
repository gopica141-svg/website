import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function Header({ 
  isLoggedIn, 
  setIsLoggedIn, 
  onLoginClick, 
  onRegisterClick, 
  onSweetsClick, 
  onAboutClick 
}) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const location = useLocation(); // Inga useLocation add panniyachu
  const userId = "6949269c5f3f77a44004b77f"; 

  useEffect(() => {
    axios.get(`https://website-1-qyg8.onrender.com/api/cart/${userId}`)
      .then((res) => {
        const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartQuantity(total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="bg-danger text-light p-2 text-center">
        Deliveries in Chennai may take up to 3 Days. For same day deliveries, order on Swiggy or Zomato.
      </div>

      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" style={{ color: "#b7954b", fontWeight: 600 }}>
            ANAND <span className="fs-6" style={{ color: "#6d5028" }}>SWEETS &amp; SAVOURIES</span>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto fw-bold">
              <NavDropdown title="Shop All" id="shopAll-dropdown">
                {/* Condition: Home page-na scroll, illana link */}
                {location.pathname === '/' ? (
                   <NavDropdown.Item onClick={onSweetsClick}>Sweets</NavDropdown.Item>
                ) : (
                   <NavDropdown.Item as={Link} to="/collections/sweets">Sweets</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/collections/dry-fruits">Dry Fruits</NavDropdown.Item>
              </NavDropdown>
              
              {/* Main Nav Link for Sweets */}
              {location.pathname === '/' ? (
                <Nav.Link onClick={onSweetsClick}>Sweets</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/collections/sweets">Sweets</Nav.Link>
              )}

              <Nav.Link as={Link} to="/collections/dry-fruits">Dry Fruits</Nav.Link>
              <Nav.Link as={Link} to="/collections/gifting">Gifting</Nav.Link>
            <Nav.Link href="/#about-section">About Us</Nav.Link>
            </Nav>

            {/* Cart and Auth Buttons */}
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                <FaShoppingCart size={24} style={{ color: "#d21d19" }} />
                {cartQuantity > 0 && (
                  <Badge bg="danger" pill style={{ position: "absolute", top: 0, right: 0, fontSize: "0.7rem" }}>
                    {cartQuantity}
                  </Badge>
                )}
              </Nav.Link>
              

              {isLoggedIn ? (
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              ) : (
                <>
                  <Nav.Link onClick={onLoginClick}>Login</Nav.Link>
                  <Button variant="outline-dark" className="ms-2" onClick={onRegisterClick}>Register</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

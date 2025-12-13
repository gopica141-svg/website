import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function Header({ 
  isLoggedIn, 
  setIsLoggedIn, 
  onLoginClick, 
  onRegisterClick, 
  onSweetsClick, 
  onAboutClick 
}) {
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
    localStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-danger text-light p-2 text-center">
        Deliveries in Chennai may take up to 3 Days. For same day deliveries, order on Swiggy or Zomato.
      </div>

      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand 
            style={{ color: "#b7954b", fontWeight: 600, cursor: "pointer" }}
            onClick={() => (window.location.href="/")}
          >
            ANAND <span className="fs-6" style={{ color: "#6d5028" }}>SWEETS &amp; SAVOURIES</span>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto fw-bold">
              <NavDropdown title="Shop All" id="shopAll-dropdown">
                <NavDropdown.Item onClick={onSweetsClick}>Sweets</NavDropdown.Item>
                <NavDropdown.Item>Dry Fruits</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={onSweetsClick}>Sweets</Nav.Link>
              <Nav.Link>Dry Fruits</Nav.Link>
              <Nav.Link>Gifting</Nav.Link>
              <Nav.Link onClick={onAboutClick}>About Us</Nav.Link>
            </Nav>

            <Nav className="align-items-center">
              <Nav.Link onClick={() => window.location.href="/cart"} className="me-3 position-relative">
                <FaShoppingCart size={24} style={{ cursor: "pointer", color: "#d21d19" }} title="View Cart" />
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


export default Header
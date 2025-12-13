import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Image } from "react-bootstrap";
import Header from "./Header";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      
      <Container className="mt-5 text-center">
         
        <h2>Your cart is empty 🛒</h2>
      </Container>
    );
  }

  return (
    <>
    <Header/>
    <Container className="mt-5">
      <h2 className="mb-4">🛍️ Shopping Cart</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th></th> 
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
            
              <td className="text-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  rounded
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                />
              </td>

              <td className="align-middle">
                <strong>{item.name}</strong>
              </td>

              <td className="align-middle">₹{item.price}</td>

              <td className="align-middle">
                <Form.Control
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                  style={{ width: "80px", textAlign: "center" }}
                />
              </td>

              <td className="align-middle">
                ₹{item.price * item.quantity}
              </td>

              <td className="align-middle">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="text-end mt-4">
        Total: <span className="text-success fw-bold">₹{getTotal()}</span>
      </h4>
    </Container>
    </>
  );
}

export default Cart
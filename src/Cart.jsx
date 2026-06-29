// import React, { useState, useEffect } from "react";
// import { Container, Table, Button, Form, Image } from "react-bootstrap";
// import Header from "./Header";
// import axios from "axios";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");
//   const userId = "6949269c5f3f77a44004b77f";
//   const API = `https://website-1-qyg8.onrender.com/api/cart/${userId}`;
//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
// useEffect(() => {
//   axios.get(API)
//     .then((res) => {
//       console.log("Full Response:", res.data);
//       // Backend-il `res.json(cart.items)` nu anuppureenga na, 
//       // direct-a res.data-vai mattum set pannunga
//       setCartItems(Array.isArray(res.data) ? res.data : []); 
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       setError("Failed to fetch cart");
//     });
// }, []);
// const updateQuantity = (productId, newQuantity) => {
//   if (newQuantity < 1) return; // 1-ku keezha pogamudiyathu

//   axios.put(`https://website-1-qyg8.onrender.com/api/cart/${userId}/${productId}`, {
//     quantity: newQuantity
//   })
//   .then((res) => {
//     // res.data-il irukkura pudhu items list-ai state-il update pannunga
//     setCartItems(res.data);
//   })
//   .catch((err) => {
//     console.error("Update Error:", err);
//     alert("Failed to update quantity.");
//   });
// };

// const removeItem = (productId) => {
//   if (!productId) {
//     console.error("Product ID is missing!");
//     return;
//   }
  
//   // URL correct-a irukku nu uruthi pannunga
//   axios.delete(`https://website-1-qyg8.onrender.com/api/cart/${userId}/${productId}`)
//     .then((res) => {
//       setCartItems(res.data);
//       alert("Item removed!");
//     })
//     .catch((err) => {
//       console.error("Remove Error:", err);
//       alert("Failed to remove item.");
//     });
// };

//   if (cartItems.length === 0) {
//     return (
//       <Container className="mt-5 text-center">
//         <Header />
//         <h3>{error ? error : "Your cart is empty 🛒"}</h3>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Container className="mt-5">
//         <h2>🛍️ Shopping Cart</h2>
//         <Table striped bordered hover responsive className="mt-4">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.productId}>
//                 <td><Image src={item.image} style={{ width: "50px" }} /></td>
//                 <td>{item.name}</td>
//                 <td>₹{item.price}</td>
//                 <td>
//                   <Form.Control 
//                     type="number" 
//                     value={item.quantity} 
//                     onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
//                     style={{ width: "70px" }}
//                   />
//                 </td>
  
//                 <td>
//                   <Button variant="danger" onClick={() => removeItem(item.productId)}>Remove</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     </>
//   );
// }

// export default Cart;

import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Adhe Header-ai reuse pannunga
import axios from "axios";
// import "./Cart.css"; // Inga CSS file separate-a iruku nu uruthi pannunga

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const userId = "6949269c5f3f77a44004b77f"; // Neenga munnadi kudutha ID
  const API = `https://website-1-qyg8.onrender.com/api/cart/${userId}`;
  // Inga dhaan useEffect-ai add pannanum
  // Cart.jsx file-il
console.log("Current Cart Items:", cartItems);
useEffect(() => {
  axios.get(`https://website-1-qyg8.onrender.com/api/cart/${userId}`)
    .then((res) => {
      console.log("Data from Backend:", res.data); // Console-il enna varuthu nu paarunga
      // res.data direct-aa array-aa irunthaal, ithu work aagum
      setCartItems(Array.isArray(res.data) ? res.data : []); 
    })
    .catch((err) => console.error("Cart Fetch Error:", err));
}, []);

  // Free Shipping Logic variables
  const FREE_SHIPPING_THRESHOLD = 35.00; // E.g., Rs. 35



  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    axios.put(`https://website-1-qyg8.onrender.com/api/cart/${userId}/${productId}`, { quantity: newQuantity })
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Update failed:", err));
  };

  const removeItem = (productId) => {
    axios.delete(`https://website-1-qyg8.onrender.com/api/cart/${userId}/${productId}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Remove failed:", err));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const amountAwayFromFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const finalTotal = Math.max(subtotal - discount, 0);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Container className="mt-5 text-center p-5 bg-white shadow-sm rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#adb5bd" viewBox="0 0 16 16" className="mb-4"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></svg>
          <h3 className="text-muted mb-4">Your cart is empty</h3>
          <Button variant="warning" size="lg" onClick={() => navigate("/")} style={{ backgroundColor: "#ff7f00", color: "#fff", borderColor: "#ff7f00" }}>CONTINUE SHOPPING</Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="my-5 p-4 bg-light shadow-sm rounded-lg" style={{ fontFamily: 'Georgia, serif' }}>
        
        {/* FREE SHIPPING TRACKER (Similar to image top bar) */}
        {amountAwayFromFreeShipping > 0 ? (
          <div className="text-center p-3 mb-4 bg-white shadow-sm rounded fs-5" style={{ color: "#d63384" }}>
            YOU ARE ₹{amountAwayFromFreeShipping.toFixed(2)} AWAY FROM FREE SHIPPING. 
            <span className="ms-2" style={{ color: "#ff7f00", textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/")}>Keep Shopping &gt;</span>
          </div>
        ) : (
          <div className="text-center p-3 mb-4 bg-white shadow-sm rounded fs-5 text-success">
            YOU QUALIFY FOR FREE SHIPPING!
          </div>
        )}

        <Row className="g-4">
          
          {/* LEFT SIDE: CART ITEM TABLE */}
          <Col xs={12} md={8}>
            <div className="bg-white p-3 rounded shadow-sm">
              <Table responsive striped className="align-middle cart-table">
                <thead style={{ color: "#777", backgroundColor: "#fafafa" }}>
                  <tr className="text-center"><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td className="text-start">
                        <div className="d-flex align-items-center">
                          <img src={item.image} alt={item.name} style={{ width: "65px", height: "65px", objectFit: "cover" }} className="me-3 rounded" />
                          <div>
                            <div className="fw-bold fs-6 mb-1 text-dark" style={{ lineHeight: "1.2" }}>{item.name}</div>
                            {/* Static details to mimic the design */}
                            <small className="text-muted d-block">Choose Count: 22 Count</small>
                            <small className="text-muted d-block">Subscribe to Save: 2 Months</small>
                            <Button variant="link" className="text-danger p-0 text-decoration-underline" onClick={() => removeItem(item.productId)}>Delete</Button>
                          </div>
                        </div>
                      </td>
                      <td className="text-center text-muted">₹{item.price.toFixed(2)}</td>
                      <td className="text-center">
                        {/* Custom looking quantity controls */}
                        <div className="d-flex align-items-center justify-content-center">
                          <Button className="qty-btn" disabled={item.quantity <= 1} onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                          <Form.Control 
                            type="number" value={item.quantity} min="1"
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                            className="text-center mx-2 qty-input"
                          />
                          <Button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                        </div>
                      </td>
                      <td className="text-center fw-semibold text-dark">₹{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="text-center">
                        {/* The small 'X' from the design */}
                        <Badge pill bg="danger" style={{ cursor: "pointer", padding: "6px 8px" }} onClick={() => removeItem(item.productId)}>✕</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* RIGHT SIDE: ORDER SUMMARY AND CONTROLS (Similar to image right panel) */}
          <Col xs={12} md={4}>
            <div className="sticky-top" style={{ top: "20px" }}>
              
              {/* Order Summary Block */}
              <div className="order-summary-block mb-4 p-3 border rounded shadow-sm bg-white" style={{ borderColor: "#eee" }}>
                <h5 className="fw-bold mb-4 text-center">ORDER SUMMARY</h5>
                <div className="d-flex justify-content-between mb-3 text-muted"><span>Subtotal:</span><span className="fw-semibold text-dark">₹{subtotal.toFixed(2)}</span></div>
                {discount > 0 && (<div className="d-flex justify-content-between text-danger mb-3"><span>Discount:</span><span>- ₹{discount.toFixed(2)}</span></div>)}
                
                {/* Free Shipping/Total highlight block */}
                <div className="total-highlight-panel p-3 mb-3 rounded" style={{ backgroundColor: amountAwayFromFreeShipping <= 0 ? "#f0fdf4" : "#ffeedd" }}>
                   <div className="d-flex justify-content-between fw-bold fs-5 mb-0" style={{ color: amountAwayFromFreeShipping <= 0 ? "#16a34a" : "#ff7f00" }}>
                      <span>Total: (Rs)</span><span>₹{finalTotal.toFixed(2)}</span>
                   </div>
                   {amountAwayFromFreeShipping > 0 && <small className="text-center text-danger d-block mt-1">Estimate Shipping to see final total.</small>}
                </div>

                <div className="summary-actions gap-2">
                  <Button className="w-100 fw-bold border-0 p-2 text-uppercase mb-2" style={{ backgroundColor: "#ff7f00", color: "#fff" }} onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT &gt;</Button>
                  <Button variant="link" className="w-100 text-warning text-uppercase text-decoration-none p-0 continue-link" onClick={() => navigate("/")}>CONTINUE SHOPPING</Button>
                </div>
              </div>

              {/* Coupon and Gift Panels */}
              <div className="coupon-gift-blocks gap-3">
                 <div className="p-3 bg-white rounded border shadow-sm mb-3">
                    <Form.Group className="mb-2">
                       <Form.Label className="text-muted fw-bold">Have a coupon code?</Form.Label>
                       <div className="d-flex gap-2">
                          <Form.Control type="text" placeholder="Enter code to redeem" />
                          <Button variant="danger" style={{ backgroundColor: "#d63384", borderColor: "#d63384" }}>APPLY</Button>
                       </div>
                    </Form.Group>
                 </div>
                 <div className="p-3 bg-white rounded border shadow-sm">
                    <Form.Group className="mb-2">
                       <Form.Label className="text-muted fw-bold">Have a gift certificate?</Form.Label>
                       <div className="d-flex gap-2">
                          <Form.Control type="text" placeholder="Enter code to redeem" />
                          <Button variant="danger" style={{ backgroundColor: "#d63384", borderColor: "#d63384" }}>APPLY</Button>
                       </div>
                    </Form.Group>
                 </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Cart;

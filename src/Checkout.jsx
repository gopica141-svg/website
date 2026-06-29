// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// function Checkout() {
//   const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleOrder = async (e) => {
//     e.preventDefault(); // Page refresh-ai thadukkum
//     setLoading(true);

//     try {
//       // Backend-kku data anuppurom
//       await axios.post('https://website-1-qyg8.onrender.com/api/orders', {
//         userId: "6949269c5f3f77a44004b77f",
//         customer: formData
//       });

//       setMessage({ type: 'success', text: 'Order Placed Successfully!' });
//       setFormData({ name: '', address: '', phone: '' }); // Form-ai clear pannum
//     } catch (error) {
//       setMessage({ type: 'danger', text: 'Failed to place order. Try again!' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ background: '#fdf9f4', minHeight: '100vh' }}>
//       <Header />
//       <Container className="py-5">
//         <h2 className="fw-bold mb-4">Checkout Details</h2>
        
//         {/* Status Message */}
//         {message && <Alert variant={message.type}>{message.text}</Alert>}

//         <Row>
//           <Col md={6}>
//             {/* Form-kku onSubmit kudutha thaan 'required' work aagum */}
//             <Form onSubmit={handleOrder}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Full Name *</Form.Label>
//                 <Form.Control 
//                   required 
//                   type="text" 
//                   placeholder="Enter name" 
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})} 
//                 />
//               </Form.Group>
              
//               <Form.Group className="mb-3">
//                 <Form.Label>Address *</Form.Label>
//                 <Form.Control 
//                   required 
//                   as="textarea" 
//                   rows={3} 
//                   placeholder="Enter delivery address" 
//                   value={formData.address}
//                   onChange={(e) => setFormData({...formData, address: e.target.value})} 
//                 />
//               </Form.Group>
              
//               <Form.Group className="mb-3">
//                 <Form.Label>Phone Number *</Form.Label>
//                 <Form.Control 
//                   required 
//                   type="tel" 
//                   pattern="[0-9]{10}"
//                   placeholder="Enter 10-digit number" 
//                   value={formData.phone}
//                   onChange={(e) => setFormData({...formData, phone: e.target.value})} 
//                 />
//               </Form.Group>
              
//               <Button 
//                 size="lg" 
//                 type="submit" 
//                 style={{ background: '#225788', border: 'none' }} 
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "PLACE ORDER"}
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// }
// export default Checkout;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import "./Checkout.css";
import Header from './Header';
import axios from 'axios';

function Checkout() {

  const [cartItems, setCartItems] = useState([]);
  const userId = "6949269c5f3f77a44004b77f"; 
  const [paymentMethod, setPaymentMethod] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
const handlePaymentSelect = (method) => {
  setPaymentMethod(method);
};

const handleOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method to proceed!");
      return;
    }

    // try {
    //   // Backend-kku order detail-ai anuppuvom
    //   const response = await axios.post("https://website-1-qyg8.onrender.com/api/orders", {
    //     userId: userId,
    //     paymentMethod: paymentMethod,
    //     total: total
    //   });

    //   if (response.status === 200) {
        setShowSuccess(true); // Success popup-ai mattum kattuvom
    //   }
    // } catch (error) {
    //   alert("Order failed. Please try again.");
    // }
  };

 useEffect(() => {
  axios.get(`https://website-1-qyg8.onrender.com/api/cart/${userId}`)
    .then((res) => {
      console.log("API Response:", res.data); // Console-il enna varuthu nu paarunga
      // res.data direct-a array-va iruntha, adhaye set pannunga
      setCartItems(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => console.error("Cart Fetch Error:", err));
}, []);
  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = 6.72; // Neenga kudutha tax value
  const total = subtotal + tax;

  // Checkout.jsx-il
  
  return (
    <>
    <Header/>
    <Container className="my-5">
      <Row>
        {/* 1. REVIEW YOUR ORDER */}
        <Col md={4}>
          <div className="checkout-section">
            <h5 className="section-title">1. REVIEW YOUR ORDER</h5>
            
            {/* Loop-ai inga start panrom */}

{Array.isArray(cartItems) && cartItems.length > 0 ? (
  cartItems.map((item) => (
    <div key={item.productId} className="order-item d-flex align-items-center mb-3">
      <img src={item.image} alt={item.name} width="60" />
      <div>
        <h6>{item.name}</h6>
        <small>Qty: {item.quantity}</small>
      </div>
      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
    </div>
  ))
) : (
  <p>No items to review.</p>
)}
            
            <hr />
            <div className="subtotal fw-bold">SUBTOTAL: ₹{subtotal.toFixed(2)}</div>
          </div>
        </Col>

        {/* 2. DELIVERY ADDRESS */}
        <Col md={4}>
          <div className="checkout-section">
            <h5 className="section-title">2. DELIVERY ADDRESS</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="e.g. name@example.com" />
              </Form.Group>
              <Row>
                <Col><Form.Group className="mb-3"><Form.Label>First name*</Form.Label><Form.Control type="text" /></Form.Group></Col>
                <Col><Form.Group className="mb-3"><Form.Label>Last name*</Form.Label><Form.Control type="text" /></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Delivery address*</Form.Label>
                <Form.Control type="text" placeholder="e.g. Door No, Street Name" />
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* 3. PAYMENT & SUMMARY */}
      <Col md={4}>
            <div className="checkout-section bg-light">
              <h5 className="section-title">3. SELECT PAYMENT METHOD</h5>
              <div className="payment-options mb-4">
                <div 
                  className={`pay-option border p-2 mb-2 ${paymentMethod === 'Card' ? 'selected-border' : ''}`} 
                  onClick={() => handlePaymentSelect('Card')}
                  style={{ cursor: 'pointer' }}
                >Credit/Debit Card</div>
                <div 
                  className={`pay-option border p-2 mb-2 ${paymentMethod === 'UPI' ? 'selected-border' : ''}`} 
                  onClick={() => handlePaymentSelect('UPI')}
                  style={{ cursor: 'pointer' }}
                >UPI / GPay</div>
              </div>
              
              <Card className="order-summary-box border-0 shadow-sm p-3">
                <h5>ORDER SUMMARY</h5>
                <div className="d-flex justify-content-between my-2"><span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between mb-2"><span>Sales Tax</span> <span>₹{tax.toFixed(2)}</span></div>
                <hr />
                <div className="total-amount fs-4 fw-bold mb-3">TOTAL: ₹{total.toFixed(2)}</div>
                <Button className="w-100 py-2 fw-bold text-uppercase" style={{backgroundColor: '#e67e22', border: 'none'}} onClick={handleOrder}>Complete Order</Button>
                <Button variant="link" onClick={() => window.history.back()} className="text-muted text-decoration-none">
                  &larr; Back to Cart
                </Button>
                
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
    {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>🎉 Order Successful!</h3>
            <p>Your order has been placed successfully. Thank you!</p>
            <Button onClick={() => window.location.href = '/'}style={{
    backgroundColor: '#fff9c4', // Light Yellow/Creamy color
    color: '#e67e22',           // Text-க்கு ஆரஞ்சு நிறம் (தீமுக்கு ஏத்தது)
    border: '1px solid #e67e22',
    fontWeight: 'bold',
    padding: '10px 20px',
    marginTop: '15px'
  }}>Back to Home</Button>
          </div>
        </div>
    )}
    </>
  );
}
export default Checkout;

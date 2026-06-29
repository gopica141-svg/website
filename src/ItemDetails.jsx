import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. useNavigate add pannunga
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios'; // Axios-ai import pannunga (for API requests)
import Header from './Header';
import Footer from './Footer';

import sweetsData from "./sweet.json"; 
import dryFruitsData from "./dry-fruits.json";
import sweetsGiftingData from "./sweets-gifting.json";
import biscottisData from "./biscottis.json";
import guiltFreeData from "./guiltfree.json";
import giftingData from "./gifting.json";

function ItemDetails() {
  const { slug, id } = useParams();
  const navigate = useNavigate(); // Navigate function-ai initialize pannunga
  const [quantity, setQuantity] = useState(1);
  const userId = "6949269c5f3f77a44004b77f"; // Hardcoded userId (SweetDetails-la irundha adhe logic)

  // Quantity control logic
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const getProduct = () => {
    let data = [];
    if (slug === 'sweets') data = sweetsData;
    else if (slug === 'dry-fruits') data = dryFruitsData;
    else if (slug === 'sweets-gifting') data = sweetsGiftingData;
    else if (slug === 'biscottis') data = biscottisData;
    else if (slug === 'guilt-free') data = guiltFreeData;
    else if (slug === 'gifting') data = giftingData;
    
    return data.find(item => String(item.id) === String(id));
  };

  const product = getProduct();

  // Axios method for API Integration (SweetDetails-la irundha adhe logic)
  const addToCart = () => {
    if (!product) return;
    console.log("Attempting to add to cart:", product.name, quantity);
    axios.post(`https://website-1-qyg8.onrender.com/api/cart/${userId}`, {
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity // Dynamic quantity send pannum
    })
    .then(() => alert(`${quantity} x ${product.name} added to cart!`))
    .catch((err) => {
      console.error("Error adding to cart:", err);
      alert("Failed to add item. Check console for details.");
    });
  };

  if (!product) {
    return (
      <>
        <Header />
        <Container className="my-5 text-center py-5">
          <h2 className="text-danger">Product Not Found! (Slug: {slug}, ID: {id}) 😔</h2>
          <Button variant="outline-primary" onClick={() => navigate("/")} className="mt-3">Go Back Home</Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <div style={{ background: '#fdf9f4', minHeight: '100vh' }}>
      <Header />
      <Container className="py-5">
        <Row className="align-items-center">
          {/* Image Section */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
              <Card.Img 
                src={product.image} 
                alt={product.name} 
                className="img-fluid" 
                style={{ height: '400px', width: '100%', objectFit: 'cover' }} // Image size fix
              />
            </Card>
          </Col>

          {/* Details Section */}
          <Col md={6} className="ps-md-5">
            <h1 className="fw-bold" style={{ color: '#225788' }}>{product.name}</h1>
            <h3 className="my-3" style={{ color: '#b87333' }}>Price: ₹ {product.price}</h3>
            <p className="text-muted fs-5 my-4">
              {product.description || `Authentic and delicious ${product.name} prepared with premium ingredients. Experience the traditional taste in every bite.`}
            </p>
            
            <hr />

            {/* Quantity Controller UI */}
            <div className="d-flex align-items-center my-4">
              <Button variant="outline-secondary" onClick={decrease}>-</Button>
              <span className="mx-4 fs-4 fw-bold">{quantity}</span>
              <Button variant="outline-secondary" onClick={increase}>+</Button>
            </div>

            {/* Action Buttons Section */}
            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Button 
                type="button"
                size="lg" 
                style={{ backgroundColor: '#225788', border: 'none', padding: '12px 40px' }} 
                onClick={addToCart}
              >
                Add to Cart
              </Button>
              
              <Button 
                type="button"
                variant="outline-dark" 
                size="lg" 
                onClick={() => navigate(-1)} 
                style={{ padding: '12px 40px' }}
              >
                Back
              </Button>
              
              <Button 
                type="button"
                size="lg" 
                variant="outline-dark" 
                onClick={() => navigate( '/checkout' )} 
                style={{ padding: '12px 40px' }}
              >
                PLACE ORDER
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ItemDetails;

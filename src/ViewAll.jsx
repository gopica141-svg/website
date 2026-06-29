import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './App.css'; // Idhu iruntha thaan CSS animation work aagum

function ViewAll() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const userId = "6949269c5f3f77a44004b77f";

  useEffect(() => {
    axios.get("https://website-1-qyg8.onrender.com/api/products/all")
      .then((res) => {
        setProducts(res.data);
        const initialQuantities = {};
        res.data.forEach(p => initialQuantities[p.productId] = 1);
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const changeQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const addToCart = (product) => {
    axios.post(`https://website-1-qyg8.onrender.com/api/cart/${userId}`, {
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantities[product.productId]
    })
    .then(() => alert(`Added ${quantities[product.productId]} x ${product.name} to cart!`))
    .catch((err) => console.error(err));
  };

  return (
    <div className="page-container" style={{ background: '#fdf9f4', minHeight: '100vh' }}>
      <Header />
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-5" style={{ color: '#225788' }}>Our Collections</h2>
        <Row className="g-4">
          {products.map((item) => (
            <Col md={3} sm={6} key={item.productId}>
              {/* .product-card class for hover lift */}
              <Card className="product-card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <Link to={`/collections/${item.category}/item-details/${item.productId}`}>
                  {/* .image-zoom-wrapper for overflow hidden */}
                  <div className="image-zoom-wrapper" style={{ borderRadius: '15px 15px 0 0' }}>
                    <Card.Img 
                      variant="top" 
                      src={item.image} 
                      className="zoom-image" // .zoom-image for scale animation
                      style={{ height: '250px', objectFit: 'cover' }} 
                    />
                  </div>
                </Link>
                <Card.Body className="d-flex flex-column text-center">
                  <Card.Title className="fw-bold">{item.name}</Card.Title>
                  <p className="fs-5 fw-bold" style={{ color: '#b87333' }}>
                    ₹ {item.price * (quantities[item.productId] || 1)}
                  </p>
                  
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <Button variant="outline-secondary" size="sm" onClick={() => changeQuantity(item.productId, -1)}>-</Button>
                    <span className="mx-3 fw-bold">{quantities[item.productId] || 1}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => changeQuantity(item.productId, 1)}>+</Button>
                  </div>

                  <div className="mt-auto">
                    <Button variant="primary" className="w-100" style={{ backgroundColor: '#225788', border: 'none' }} onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ViewAll;

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import data from "./sweet.json";

function Sweet() {
  const navigate = useNavigate();
  const userId = "6949269c5f3f77a44004b77f";
  const sweets = data.filter(item => item.category === "sweets");
  const addToCart = (product) => {
    axios.post(`https://website-1-qyg8.onrender.com/api/cart/${userId}`, {
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    .then(() => alert(`${product.name} added to cart!`))
    .catch((err) => {
      console.error("Error adding to cart", err);
      alert("Failed to add item. Please try again.");
    });
  };

  return (
    <div style={{ background: '#fdfbf7', padding: '50px 0' }}>
      <Container>
        <h3 className="fw-bold text-center mb-5">Excellence In Every Bite</h3>
        <Row className="g-4">
          {data.map((product) => (
            <Col md={3} sm={6} xs={12} key={product.id}>
              {/* Card-kku matum radius vachirukken, image top sharp-ah irukum */}
              <Card className="h-100 border-0 shadow-sm zoom-card" style={{ overflow: 'hidden', borderRadius: '15px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ 
                    width: "100%",
                    height: "250px", 
                    objectFit: "cover", 
                    cursor: "pointer",
                    borderRadius: "0" // Ithu thaan top curve-ai remove pannum
                  }}
                  onClick={() => navigate(`/sweets/${product.id}`)}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold text-dark">{product.name}</Card.Title>
                  <Card.Text className="text-muted mb-3">₹ {product.price}</Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
      </Container>
    </div>
  );
}

export default Sweet;

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import data from './sweet.json'; // Unga product data
import Header from './Header';
import Footer from './Footer';

function DryFruits() {
  // Dry fruits products-ai matum filter panrom
  const dryFruits = data.filter(item => item.category === "dry-fruits");

  return (
    <div style={{ background: '#fdf9f4', minHeight: '100vh' }}>
      <Header />
      <Container className="my-5">
        <h2 className="fw-bold mb-5 text-center">Our Dry Fruits</h2>
        <Row className="g-4">
          {dryFruits.map((product) => (
            <Col md={3} sm={6} key={product.id}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }} />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">{product.name}</Card.Title>
                  <Card.Text style={{ color: '#b87333', fontWeight: 'bold' }}>₹{product.price}</Card.Text>
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
export default DryFruits;
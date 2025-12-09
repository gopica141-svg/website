import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import Header from './Header';
import Footer from './footer';

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`details/${id}`);
  };
  const handleNavigateAbout = ()=>{
    navigate('/about');
  };

  return (
    <>
     <Header/>
      <div
        style={{
          background: '#e9f2f9',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          position: 'relative',
          left: '0',
          paddingBottom: '36px',
        }}
      >
        <Container fluid>
          <Row className="align-items-center pt-4 pb-2 flex-column-reverse flex-md-row">
            <Col md={6} className="text-center text-md-start pt-4 pt-md-0">
              <h2 className="fw-bold display-5 mb-2" style={{ color: '#225788' }}>
                A LEGACY <span style={{ color: '#246fa8' }}>REIMAGINED!</span>
              </h2>
              <h4 className="fw-semibold mb-3">
                Mysore Pak &amp; Kaju Katli,<br />Now Made with <span className="fw-bold">Pure Jaggery!</span>
              </h4>
              <Button
                size="lg"
                variant="primary"
                style={{
                  borderRadius: '30px',
                  background: '#225788',
                  border: 'none',
                }}
              >
                Shop Now
              </Button>

           
            </Col>

            <Col md={6} className="text-center">
              <img
                src="/images/sweets2.jpeg"
                alt="sweets"
                style={{
                  width: '170px',
                  height:'170px',
                  margin: '16px',
                  borderRadius: '18px',
                  boxShadow: '0 8px 36px #f3f1ecff',
                }}
              />
              <img
                src="/images/sweets1.jpeg"
                alt="sweets"
                style={{
                  width: '170px',
                  borderRadius: '18px',
                  boxShadow: '0 8px 36px #f8f8f6ff',
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      
      <Container fluid className="py-5">
        <h3 className="fw-bold text-center mb-5">
          Excellence In Every Bite Of Our Sweets, Snacks, And Treats
        </h3>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.map((prod) => (
            <Col key={prod.id}>
              <Card
                className="h-100 shadow-sm border-0"
                onClick={() => handleNavigate(prod.id)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>

                <Card.Body className="text-center">
                  <Card.Title className="fw-semibold">{prod.name}</Card.Title>
                  <Card.Text className="mb-2">
                    <strong>₹{prod.price}</strong>
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

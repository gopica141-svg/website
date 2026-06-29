import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImages from "./aboutImages.json";

function About() {
  return (
    <div className="page-container" style={{ background: '#fdf9f4', paddingBottom: '50px' }}>
      
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#225788", fontSize: "2.5rem" }}>About Us</h2>
          <div className="mx-auto" style={{ height: "4px", width: "60px", background: "#b87333", marginTop: "10px" }}></div>
        </div>

        <p className="text-center mb-5 fs-5 text-muted" style={{ maxWidth: "800px", margin: "0 auto" }}>
          Welcome to <strong>Sweet Heritage</strong> – where every bite tells a story of tradition, love, and purity. 
          We take pride in crafting authentic Indian sweets made with 100% pure ingredients.
        </p>

        <Row>
          {aboutImages.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              {/* Zoom Effect-oda Card */}
              <Card className="product-card h-100 border-0 shadow-sm" style={{ borderRadius: "20px", overflow: "hidden" }}>
                
                <div className="image-zoom-wrapper" style={{ height: "280px" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="zoom-image"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <Card.Body className="text-center p-4">
                  <h5 className="fw-bold" style={{ color: "#225788" }}>{item.title}</h5>
                  <p className="text-muted">{item.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5 p-5" style={{ background: "#225788", borderRadius: "20px" }}>
          <h4 className="text-white fst-italic">
            “Happiness is homemade – and so are our sweets!”
          </h4>
        </div>
      </Container>
    </div>
  );
}
export default About;
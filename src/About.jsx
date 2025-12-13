import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import aboutImages from "./aboutImages.json";

function About() {
  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#225788" }}>
        About <span style={{ color: "#246fa8" }}>Us</span>
      </h2>

      <p className="text-center mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        Welcome to <strong>Sweet Heritage</strong> – where every bite tells a story of
        tradition, love, and purity. We take pride in crafting authentic Indian sweets
        made with 100% pure ingredients and a whole lot of care.
      </p>

      <Row className="text-center">
        {aboutImages.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Image
              src={item.image}
              alt={item.title}
              fluid
              rounded
              style={{
                height: "250px",
                width: "100%",
                objectFit: "cover",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
              }}
            />
            <h5 className="mt-3">{item.title}</h5>
            <p className="text-muted small">{item.description}</p>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <h4 className="fw-semibold" style={{ color: "#225788" }}>
          “Happiness is homemade – and so are our sweets!”
        </h4>
      </div>
    </Container>
  );
}
export default About;
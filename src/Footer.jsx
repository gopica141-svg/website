import React from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Form, Col, Button, Card } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: '#F8F8F8', padding: '40px 0', color: '#333' }}>
        <Container>

          <Row className="mb-4">
            <Col md={10}>
              <div className="d-flex align-items-center">

                <h2 style={{ color: '#A3885C', marginRight: '10px' }}>ANAND®</h2>
                <p className="text-uppercase m-0" style={{ fontSize: '0.9rem' }}>SWEETS & SAVOURIES</p>
              </div>
            </Col>
            <Col md={2} className="d-none d-md-block text-end">

              <div style={{ color: '#A3885C', fontSize: '2rem' }}></div>
            </Col>
          </Row>
          <hr />


          <Row className="py-4">


            <Col lg={2} md={4} sm={6} className="mb-4">
              <h5 className="mb-3">Our Range</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Sweets</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Dry Fruits</a></li>

              </ul>
            </Col>

            <Col lg={2} md={4} sm={6} className="mb-4">
              <h5 className="mb-3">About Us</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Company</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Contact Us</a></li>

              </ul>
            </Col>

            <Col lg={2} md={4} sm={6} className="mb-4">
              <h5 className="mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-dark text-decoration-none">Terms & Conditions</a></li>
                <li><a href="#" className="text-dark text-decoration-none">Privacy Policy</a></li>

              </ul>
            </Col>


            <Col lg={6} md={12} className="mb-4">
              <h4 style={{ color: '#A3885C' }}>We'd Be Happy To Assist You!</h4>


              <Form className="d-flex my-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  className="rounded-0 border-end-0"
                />
                <Button
                  variant="warning"
                  style={{ backgroundColor: '#D4AF37', borderColor: '#D4AF37' }}
                  className="rounded-0 text-white"
                >
                  Subscribe
                </Button>
              </Form>


              <Row>
                <Col md={6} className="mb-2">
                  <p className="fw-bold mb-1">Timing :</p>
                  <p className="m-0">Monday To Saturday</p>
                  <p className="m-0">10:00 AM to 05:30 PM IST</p>
                </Col>
                <Col md={6}>
                  <p className="fw-bold mb-1">Email :</p>
                  <a href="mailto:care@anandsweets.net" className="text-dark text-decoration-none">
                    care@anandsweets.net
                  </a>
                </Col>
              </Row>
            </Col>

          </Row>

          <hr />


          <Row className="align-items-center pt-3">
            <Col md={6}>
              <p className="fw-bold">Payment Methods</p>

              <div className="d-flex gap-3">

                <span style={{ fontSize: '2rem' }}>💳</span>
                <span style={{ fontSize: '2rem' }}>💳</span>
              </div>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <p className="fw-bold">Follow Us On</p>

              <div className="d-flex justify-content-md-end gap-3">

                <a href="#"><span style={{ fontSize: '1.5rem', color: '#333' }}>📘</span></a>
                <a href="#"><span style={{ fontSize: '1.5rem', color: '#333' }}>📸</span></a>

              </div>
            </Col>
          </Row>


          <Row className="mt-3">
            <Col className="text-center">
              <p className="m-0" style={{ fontSize: '0.8rem' }}>
                © 2025 Copyright. Anand Sweets & Savouries LLP. All Rights Reserved. | Site By <span style={{ fontWeight: 'bold' }}>aBox Agency.</span>
              </p>
            </Col>
          </Row>

        </Container>
      </footer>
    </>
  )
}

import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import About from './About';
import Sweet from './Sweet';
import Login from './Login';
import Register from './Register';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const sweetsRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSweets = () => {
    if (sweetsRef.current) {
      sweetsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>

      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
        onSweetsClick={scrollToSweets}
        onAboutClick={scrollToAbout}
      />


      <div style={{
        filter: showLogin || showRegister ? 'blur(4px)' : 'none',
        pointerEvents: showLogin || showRegister ? 'none' : 'auto',
      }}>

        <div style={{
          background: '#e9f2f9',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          position: 'relative',
          left: '0',
          paddingBottom: '36px',
        }}>
          <Container>
            <Row className="align-items-center pt-4 pb-2 flex-column-reverse flex-md-row">
              <Col md={6} className="text-center text-md-start pt-4 pt-md-0">
                <h2 className="fw-bold display-5 mb-2" style={{ color: '#225788' }}>
                  A LEGACY <span style={{ color: '#246fa8' }}>REIMAGINED!</span>
                </h2>
                <h4 className="fw-semibold mb-3">
                  Mysore Pak &amp; Kaju Katli,<br />Now Made with <span className="fw-bold">Pure Jaggery!</span>
                </h4>
              </Col>
              <Col md={6} className="text-center">
                <img
                  src="/images/sweets2.jpeg"
                  alt="sweets"
                  style={{ width: '170px', height: '170px', margin: '16px', borderRadius: '18px', boxShadow: '0 8px 36px #f3f1ecff' }}
                />
                <img
                  src="/images/sweets1.jpeg"
                  alt="sweets"
                  style={{ width: '170px', borderRadius: '18px', boxShadow: '0 8px 36px #f8f8f6ff' }}
                />
              </Col>
            </Row>
          </Container>
        </div>




        <div ref={sweetsRef}>
          <Sweet />
        </div>
        <div ref={aboutRef}>

          <About />
        </div>
      </div>

      <Footer />


      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login setIsLoggedIn={setIsLoggedIn} onClose={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register onClose={() => setShowRegister(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}



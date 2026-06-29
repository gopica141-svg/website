import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Card, Modal,Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Sweet from './Sweet';
import Login from './Login';
import Register from './Register';
import data from './sweet.json';
import ViewAll from './ViewAll';
import dryFruitsData from './dry-fruits.json';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const sweetsRef = useRef(null);
  const aboutRef = useRef(null);
  const scrollToSweets = () => sweetsRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: 'smooth' });

  const categories = [
    { title: "Sweets Gifting", count: "8 Products", img: "/images/ss.jpg", slug: "sweets-gifting" },
    { title: "Dry Fruits", count: "4 Products", img: "/images/ddd.jpg", slug: "dry-fruits" },
    { title: "Biscottis", count: "6 Products", img: "/images/bbb.jpg", slug: "biscottis" },
    { title: "Guilt Free", count: "10 Products", img: "/images/GGG.jpg", slug: "guilt-free" }
  ];

  
  return (
    <div style={{ background: '#fdfbf7', minHeight: '100vh' }}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} onSweetsClick={scrollToSweets}onAboutClick={scrollToAbout} />
        <div id="dry-fruits"> 
  
</div>
<Carousel interval={2000} indicators={false} controls={false} style={{ background: '#fdf9f4' }}>
        
        {/* Slide 1 - Creamy Background with Navy Blue Text */}
        <Carousel.Item style={{ background: '#f2bd7d', padding: '60px 0', overflow: 'hidden' }}>
          <Container>
            <Row className="align-items-center flex-column-reverse flex-md-row">
              {/* Left Side: Text and CTA */}
              <Col md={6} className="text-center text-md-start">
                <div className="d-inline-block border border-dark rounded-circle px-3 py-2 mb-3">
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px' }}>NO REFINED SUGAR</span>
                </div>
                <h1 className="display-4 fw-bold" style={{ color: '#225788', lineHeight: '1.1' }}>A LEGACY<br />REIMAGINED!</h1>
                <hr style={{ width: '80px', borderTop: '4px solid #225788', margin: '20px 0' }} />
                <p className="lead fw-semibold mb-4" style={{ color: '#225788' }}>
                  Mysore Pak & Kaju Katli,<br />
                  Now Made with <span style={{ color: '#b87333' }}>Pure Jaggery!</span>
                </p>
                <Button size="lg" onClick={scrollToSweets} style={{ backgroundColor: '#225788', border: 'none', padding: '12px 35px', borderRadius: '5px' }}>SHOP NOW</Button>
              </Col>
              
              {/* Right Side: High Contrast Layered Images */}
              <Col md={6} className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: '350px' }}>
                <img src="/images/An.jpg" alt="Sweets" style={{ width: '250px', zIndex: 2, marginRight: '-60px', boxShadow: '10px 10px 30px rgba(0,0,0,0.1)', borderRadius: '15px', border: '4px solid white' }} />
                <img src="/images/Gift.jpg" alt="Gift Box" style={{ width: '250px', zIndex: 1, boxShadow: '10px 10px 30px rgba(0,0,0,0.1)', borderRadius: '15px', border: '4px solid white' }} />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Slide 2 - Deep Red Background with White/Cream Text */}
        <Carousel.Item style={{ background: '#8B0000', padding: '60px 0', overflow: 'hidden' }}>
          <Container>
            <Row className="align-items-center flex-column-reverse flex-md-row">
              {/* Left Side: Text and CTA (Contrast Content) */}
              <Col md={6} className="text-center text-md-start">
                <div className="d-inline-block border border-light rounded-circle px-3 py-2 mb-3">
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', color: 'white' }}>PURE TRADITION</span>
                </div>
                <h1 className="display-4 fw-bold" style={{ color: 'white', lineHeight: '1.1' }}>CELEBRATE<br />WITH TASTE!</h1>
                <hr style={{ width: '80px', borderTop: '4px solid white', margin: '20px 0' }} />
                <p className="lead fw-semibold mb-4" style={{ color: 'white' }}>
                  Traditional recipes,<br />
                  Now in <span style={{ color: '#fdf9f4' }}>Elegant Hampers!</span>
                </p>
                <Button size="lg" onClick={scrollToSweets} style={{ backgroundColor: '#fdf9f4', color: '#8B0000', border: 'none', padding: '12px 35px', borderRadius: '5px', fontWeight: '800' }}>DISCOVER</Button>
              </Col>
              
              {/* Right Side: Layered Images (Different Arrangement for slide 2) */}
              <Col md={6} className="d-flex justify-content-center align-items-center position-relative" style={{ minHeight: '350px' }}>
                <img src="/images/An.jpg" alt="Sweets" style={{ width: '250px', zIndex: 1, marginRight: '-60px', boxShadow: '10px 10px 30px rgba(0,0,0,0.1)', borderRadius: '15px', border: '4px solid white' }} />
                <img src="/images/Gift.jpg" alt="Gift Box" style={{ width: '250px', zIndex: 2, boxShadow: '10px 10px 30px rgba(0,0,0,0.1)', borderRadius: '15px', border: '4px solid white' }} />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

      </Carousel>
<Container className="my-5">
  <div 
    className="product-card p-5 text-center shadow-lg position-relative" 
    style={{ 
      // Pastel Dreamy Background
      background: 'linear-gradient(135deg, rgba(255,245,247,0.9), rgba(240,248,255,0.9))',
      backdropFilter: 'blur(20px)',
      borderRadius: '40px',
      border: '2px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 15px 35px rgba(184, 115, 51, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.5s ease'
    }}
  >
    {/* Dreamy Pastel Blobs */}
    <div style={{
      position: 'absolute', top: '-100px', left: '-100px',
      width: '300px', height: '300px',
      background: 'radial-gradient(circle, #fce4ec, transparent)',
      borderRadius: '50%', opacity: '0.8', filter: 'blur(60px)'
    }}></div>
    
    <div style={{
      position: 'absolute', bottom: '-100px', right: '-100px',
      width: '300px', height: '300px',
      background: 'radial-gradient(circle, #e1f5fe, transparent)',
      borderRadius: '50%', opacity: '0.8', filter: 'blur(60px)'
    }}></div>

    <h2 className="fw-bold" style={{ color: '#225788', fontSize: '3rem', letterSpacing: '-2px', position: 'relative' }}>
      Excellence in every bite
    </h2>
    <p className="text-secondary mt-3 fs-5" style={{ maxWidth: '600px', margin: '0 auto', opacity: '0.9', position: 'relative' }}>
      Handcrafted with love. Discover the fusion of traditional recipes and pure, natural sweetness.
    </p>
    
    <div className="mt-4 d-flex justify-content-center gap-3" style={{ position: 'relative' }}>
      {[
        { text: '✨ 100% Pure', bg: '#f8bbd0', col: '#880e4f' },
        { text: '🏠 Kitchen Fresh', bg: '#b3e5fc', col: '#01579b' },
        { text: '🍯 Naturally Sweet', bg: '#fff9c4', col: '#f57f17' }
      ].map((item, idx) => (
        <span 
          key={idx}
          className="px-4 py-2" 
          style={{ 
            background: item.bg, 
            color: item.col,
            borderRadius: '50px', fontWeight: '700', cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.15)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          {item.text}
        </span>
      ))}
    </div>
  </div>
</Container>

      {/* Shop Our Range Section */}
      <Container className="my-5 py-5">
        <h2 className="fw-bold mb-5 text-center">Shop Our Range</h2>
        <Row className="g-4">
          {categories.map((cat, idx) => (
            <Col md={3} sm={6} key={idx}>
              <Link to={`/collections/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <Card className="border-0 shadow-sm h-100 zoom-card">
                  <Card.Img variant="top" src={cat.img} style={{ height: '300px', objectFit: 'cover' }} />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-dark">{cat.title}</Card.Title>
                    <Card.Text className="text-muted">{cat.count}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* View All Products - Premium Card Section */}
<Container className="my-5">
  <div 
    className="product-card p-5 text-center shadow-lg position-relative" 
    style={{ 
      // Premium Red-Cream Gradient for consistency
      background: 'linear-gradient(135deg, #fdfcfb 0%, #fff7f7 100%)',
      backdropFilter: 'blur(15px)',
      borderRadius: '40px',
      border: '2px solid #efe8e0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      transition: 'all 0.5s ease'
    }}
  >
    {/* Decorative Soft Accents */}
    <div style={{
      position: 'absolute', top: '-50px', left: '-50px',
      width: '200px', height: '200px',
      background: 'radial-gradient(circle, #fde4e1, transparent)',
      borderRadius: '50%', opacity: '0.5', filter: 'blur(40px)'
    }}></div>

    <h3 className="fw-bold" style={{ color: '#8B0000' }}>Explore Our Entire Collection</h3>
    <p className="text-muted" style={{ maxWidth: '450px' }}>
      Can't find what you are looking for? Click below to see all our delicious varieties crafted with tradition.
    </p>
    
    <Link to="/view-all" style={{ textDecoration: 'none' }}>
      <Button 
        size="lg" 
        className="px-5 py-3 shadow-sm" 
        style={{ 
          background: '#8B0000', // Matching Banner Red
          color: '#ffffff', 
          border: 'none', 
          borderRadius: '50px',
          fontWeight: '700',
          transition: 'transform 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        View All Products
      </Button>
    </Link>
  </div>
</Container>
      <div ref={sweetsRef}><Sweet /></div>

   <div id="about-section" className="py-5"><About /></div>
      <Footer />
{/* Login & Register Modals */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Body>
          <Login 
            setIsLoggedIn={setIsLoggedIn} 
            onClose={() => setShowLogin(false)} 
            onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} 
          />
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Body>
          <Register 
            onClose={() => setShowRegister(false)} 
            onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
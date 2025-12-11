import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      setError("User not registered. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
      
      sessionStorage.setItem("isAuthenticated", "true");
      setIsLoggedIn(true);

      navigate('/');
    } 
    else {
      setError("Invalid password.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            Don't have an account?{' '}
            <Button variant="link" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

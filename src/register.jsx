import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage(<Alert variant="danger">All fields are required!</Alert>);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(<Alert variant="danger">Passwords do not match!</Alert>);
      return;
    }

    if (localStorage.getItem(email)) {
      setMessage(<Alert variant="warning">User already exists! Please login.</Alert>);
      return;
    }

    
    localStorage.setItem(email, JSON.stringify({ email, password }));

    setMessage(<Alert variant="success">Registration Successful! Redirecting to Login...</Alert>);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Register</h2>
          {message}

          <Form onSubmit={handleRegister}>
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

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


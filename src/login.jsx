import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function Login({ setIsLoggedIn, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      if (onClose) onClose(); // close modal after login
    } else {
      setError("Invalid password.");
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {error && <Alert variant="danger">{error}</Alert>}

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

      <Button type="submit" className="w-100">Login</Button>
    </Form>
  );
}
export default Login
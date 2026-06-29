// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("https://website-1-qyg8.onrender.com/login", { email, password })
//       .then((result) => {
//         if (result.data === "success") {
//           navigate("/");
//         } else {
//           setError("Invalid email or password");
//         }
//       })
//       .catch(() => {
//         setError("Server error. Try again later.");
//       });
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h3 className="text-center mb-4">Login</h3>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </Form.Group>

//         <Button type="submit" className="w-100">
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Login({ setIsLoggedIn, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://website-1-qyg8.onrender.com/api/auth/login', formData);
      localStorage.setItem('isAuthenticated', 'true');
      setIsLoggedIn(true);
      onClose();
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="p-4" style={{ background: '#fdfbf7', borderRadius: '25px', border: '1px solid #efe8e0' }}>
      <h3 className="fw-bold text-center mb-4" style={{ color: '#225788' }}>Heritage Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Control type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        </Form.Group>
        <Button className="w-100 btn-heritage" type="submit">Login</Button>
      </Form>
      <p className="text-center mt-3" style={{ cursor: 'pointer', color: '#8B0000' }} onClick={onSwitchToRegister}>
        New to Sweet Heritage? Register
      </p>
    </div>
  );
}
export default Login;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// function Register({ onClose }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate=useNavigate();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//   alert("Passwords do not match");
//   return;
// }

//     axios.post("https://website-1-qyg8.onrender.com/register",{email,password,confirmPassword})
//     .then((result)=>{
//       console.log(result);
//       alert("registration Successfull");
//       onClose();
//       navigate("/login");
//     })
//     .catch((err)=>{
//       console.log(err);
//     });

//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       {message}

//       <Form.Group className="mb-3">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Confirm Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </Form.Group>

//       <Button type="submit" className="w-100">Register</Button>
//     </Form>
//   );
// }
// export default Register

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Register({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://website-1-qyg8.onrender.com/api/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    console.log("Success:", response.data);
    alert("Account created successfully!");
  } catch (err) {
    alert("Registration failed. Please check the details.");
  }
};

  return (
    <div className="p-4" style={{ background: '#fdfbf7', borderRadius: '25px' }}>
      <h3 className="fw-bold text-center mb-4" style={{ color: '#225788' }}>Join Sweet Heritage</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3"><Form.Control placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required /></Form.Group>
        <Form.Group className="mb-3"><Form.Control type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required /></Form.Group>
        <Button className="w-100 btn-heritage" type="submit">Create Account</Button>
      </Form>
      <p className="text-center mt-3" style={{ cursor: 'pointer', color: '#8B0000' }} onClick={onSwitchToLogin}>Already a member? Login</p>
    </div>
  );
}
export default Register;

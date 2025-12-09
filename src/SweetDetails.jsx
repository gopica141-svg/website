import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import data from "./data.json";
import Header from "./Header";
import Footer from "./footer";
const SweetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = data.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  if (!product) return <p>Product not found!</p>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setSuccessMsg(`🎉 ${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <>
    <Header/>
    <Container className="my-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        ← Back
      </Button>

      {successMsg && (
        <Alert variant="success" className="text-center fw-semibold">
          {successMsg}
        </Alert>
      )}

      <div className="text-center">
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "300px", objectFit: "contain" }}
          className="mb-3"
        />
        <h3>{product.name}</h3>
        <p className="text-muted">₹ {product.price}</p>
        <p>{product.description || "No description available."}</p>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="outline-dark" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mx-2 text-center"
            style={{ width: "50px" }}
          />
          <Button variant="outline-dark"  onClick={() => setQuantity(quantity + 1)}>+</Button>
        </div>

        <Button variant="warning" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Container>
    <Footer/>
    </>
  );
};

export default SweetDetails;

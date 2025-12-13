import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import data from "./sweet.json";
import Header from "./Header";
import Footer from "./Footer";

function SweetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find current product
  const product = data.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  if (!product) {
    return (
      <p className="text-center mt-5 fw-semibold fs-4 text-danger">
        ❌ Product not found!
      </p>
    );
  }

  // Add or update product in cart
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Button handlers
  const handleAddToCart = () => {
    addToCart();
    setSuccessMsg(`🎉 ${quantity} × ${product.name} added to cart!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleOrderNow = () => {
    addToCart();
    setSuccessMsg(`✅ ${quantity} × ${product.name} ordered successfully!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <>
      <Header />

      <Container className="my-5">

        {/* Back Button */}
        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        {/* Success Message */}
        {successMsg && (
          <Alert variant="success" className="text-center fw-semibold">
            {successMsg}
          </Alert>
        )}

        {/* Product Section */}
        <div className="text-center">
          <img
            src={product.image}
            alt={product.name}
            className="mb-3 shadow"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="text-muted mt-2">₹ {product.price}</h4>
          <p className="mt-3">{product.description}</p>

          {/* Quantity Selector */}
          <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
            <Button
              variant="outline-dark"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="mx-2 text-center"
              style={{ width: "60px", padding: "5px" }}
            />

            <Button
              variant="outline-dark"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <Button variant="warning" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            <Button variant="success" onClick={handleOrderNow}>
              Order Now
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default SweetDetails;

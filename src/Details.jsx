import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import data from "./sweets.json";
import Header from "./Header";
import Footer from "./footer";

export default function Details() {
  const { id } = useParams();

  const [productQuantity, setProductQuantity] = useState(1);

  const item = data.find((d) => String(d.id) === String(id));

  const handleAddToCart = () => {
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((i) => i.id === item.id);

    if (existingItemIndex >= 0) {
      
      cart[existingItemIndex].quantity += productQuantity;
    } else {
      
      cart.push({ ...item, quantity: productQuantity });
    }


    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${productQuantity} x ${item.title} added to cart!`);
  };

  if (!item) {
    return (
      <h2 className="text-center mt-5 text-danger">Item not found</h2>
    );
  }

  return (
    <>
    <Header/>
      <Container className="my-5 p-4 bg-white shadow-lg rounded-2xl">
        <Row>
          <Col md={5} className="mb-4 mb-md-0">
            <Image
              src={item.image}
              alt={item.title}
              fluid
              className="rounded-xl"
            />
          </Col>

          <Col md={7}>
            <h1 className="text-3xl font-bold mb-3">{item.title}</h1>
            <p className="text-gray-700 mb-4">{item.description}</p>

            <h3 className="mb-4" style={{ color: "#A3885C" }}>
              Price: ₹{item.price}
            </h3>

            <div className="d-flex align-items-center mb-5">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  setProductQuantity((prev) => Math.max(1, prev - 1))
                }
                className="rounded-0 me-2"
              >
                -
              </Button>

              <Form.Control
                type="number"
                value={productQuantity}
                onChange={(e) =>
                  setProductQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="text-center rounded-0"
                style={{ width: "60px" }}
              />

              <Button
                variant="outline-secondary"
                onClick={() => setProductQuantity((prev) => prev + 1)}
                className="rounded-0 ms-2"
              >
                +
              </Button>

              <Button
                variant="warning"
                onClick={handleAddToCart}
                className="ms-4 rounded-0 text-white"
                style={{ backgroundColor: "#D4AF37", borderColor: "#D4AF37" }}
              >
                Add to cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

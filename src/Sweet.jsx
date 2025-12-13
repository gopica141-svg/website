import React, { useState } from "react";
import {Container,Row, Col, Card,Button,InputGroup,FormControl,Alert,
} from "react-bootstrap";
import data from "./sweet.json";
import { useNavigate } from "react-router-dom";

const Sweet = () => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(
    data.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  
  const [successMsg, setSuccessMsg] = useState("");

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, value || 1),
    }));
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantities[product.id];
    } else {
      cart.push({ ...product, quantity: quantities[product.id] });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };


  const handleOrderNow = (product) => {
    handleAddToCart(product);

    
    setSuccessMsg(`🎉 ${quantities[product.id]} x ${product.name} ordered successfully!`);

    
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  return (

    
    <Container className="my-5">
                <h3 className="fw-bold text-center mb-5">
            Excellence In Every Bite Of Our Sweets, Snacks, And Treats
          </h3>

      

      

        <Row>
          {data.map((product) => (
            <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
              <Card className="h-100 border-0 text-center shadow-sm">
                <div className="p-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: "250px", objectFit: "contain" }}
                    onClick={()=>navigate(`/sweets/${product.id}`)}
                  />
                </div>

                <Card.Body>
                  <Card.Text className="text-start mb-2">
                    <strong>{product.name}</strong>
                    <br />
                    <span className="text-muted">₹ {product.price}</span>
                  </Card.Text>

                  <InputGroup className="mt-2 d-flex flex-column align-items-center">
                    <div className="d-flex mb-2 w-100">
                
                   

                 
                  </div>

                  <div className="d-flex justify-content-center">
                   

                    

                   
                  </div>
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Sweet;



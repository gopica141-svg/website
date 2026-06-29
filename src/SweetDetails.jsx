// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import axios from "axios";
// import Header from './Header'; 
// import Footer from './Footer'; 

// // Import JSON files (Ensure file names match exactly in your folder)
// import sweetsData from "./sweet.json"; 
// import dryFruitsData from "./dry-fruits.json"; 

// function SweetDetails() {
//   const { slug, id } = useParams();
//   const navigate = useNavigate();
//   const userId = "6949269c5f3f77a44004b77f"; 

//   // Select data based on slug
//   const data = (slug === "dry-fruits") ? dryFruitsData : sweetsData;
//   const product = data.find((p) => p.id.toString() === id.toString());

//   const addToCart = () => {
//     if (!product) return;
//     axios.post(`https://website-1-qyg8.onrender.com/api/cart/${userId}`, {
//       productId: product.id.toString(),
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1
//     })
//     .then(() => alert(`${product.name} added to cart!`))
//     .catch((err) => {
//       console.error("Error adding to cart", err);
//       alert("Failed to add item.");
//     });
//   };

//   if (!product) {
//     return (
//       <div style={{ background: '#fdf9f4', minHeight: '100vh' }}>
//         <Header />
//         <Container className="mt-5 text-center py-5">
//           <h2 className="text-danger">Product not found! 😔</h2>
//           <Button variant="outline-primary" onClick={() => navigate("/")} className="mt-3">Go Back Home</Button>
//         </Container>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div style={{ background: '#fdf9f4', minHeight: '100vh' }}>
//       <Header />
//       <Container className="py-5">
//         <Row className="align-items-center">
//           <Col md={6} className="text-center">
//             <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
//               <Card.Img
//                 src={product.image}
//                 alt={product.name}
//                 style={{ height: "400px", width: "100%", objectFit: "cover" }}
//               />
//             </Card>
//           </Col>
//           <Col md={6} className="ps-md-5 mt-4 mt-md-0">
//             <h1 className="fw-bold" style={{ color: '#225788' }}>{product.name}</h1>
//             <h3 className="my-3" style={{ color: '#b87333' }}>₹ {product.price}</h3>
//             <p className="text-muted fs-5 my-4">
//               Authentic and delicious {product.name} prepared with premium, organic ingredients. 
//               Experience the traditional taste in every bite.
//             </p>
//             <hr />
//             <div className="d-flex gap-3 mt-4">
//               <Button size="lg" style={{ backgroundColor: '#225788', border: 'none', padding: '12px 40px' }} onClick={addToCart}>
//                 Add to Cart
//               </Button>
//               <Button variant="outline-dark" size="lg" onClick={() => navigate(-1)} style={{ padding: '12px 40px' }}>
//                 Back
//               </Button>
//               <Button size="lg" variant="outline-dark" onClick={() => navigate('/checkout')} style={{ padding: '12px 40px' }}>
//                 PLACE ORDER
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// }

// export default SweetDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from './Header'; 
import Footer from './Footer'; 

function SweetDetails() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const userId = "6949269c5f3f77a44004b77f"; 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // 1. Quantity State

  useEffect(() => {
    const category = slug || "sweets"; 
    axios.get(`https://website-1-qyg8.onrender.com/api/products/${category}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details", err);
        setLoading(false);
      });
  }, [slug, id]);

  // 2. Quantity Change Handler
  const changeQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    if (!product) return;
    axios.post(`https://website-1-qyg8.onrender.com/api/cart/${userId}`, {
      productId: product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity // Current quantity-ai anupuvom
    })
    .then(() => alert(`${quantity} x ${product.name} added to cart!`))
    .catch((err) => {
      console.error("Error adding to cart", err);
      alert("Failed to add item.");
    });
  };

  if (loading) return <Container className="text-center py-5"><h2>Loading...</h2></Container>;

  if (!product) {
    return (
      <div className="page-container" style={{ background: '#fdf9f4', minHeight: '100vh' }}>
        <Header />
        <Container className="mt-5 text-center py-5">
          <h2 className="text-danger">Product not found! 😔</h2>
          <Button variant="outline-primary" onClick={() => navigate("/")} className="mt-3">Go Back Home</Button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ background: '#fdf9f4' }}>
      <Header />
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <Card className="product-card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="image-zoom-wrapper" style={{ borderRadius: '20px' }}>
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  className="zoom-image"
                  style={{ height: "400px", width: "100%", objectFit: "cover" }}
                />
              </div>
            </Card>
          </Col>
          <Col md={6} className="ps-md-5 mt-4 mt-md-0">
            <h1 className="fw-bold" style={{ color: '#225788' }}>{product.name}</h1>
            
            {/* 3. Dynamic Price Calculation */}
            <h3 className="my-3" style={{ color: '#b87333' }}>
              ₹ {product.price * quantity}
            </h3>
            
            <p className="text-muted fs-5 my-4">{product.description}</p>
            
            {/* 4. Quantity Selector UI */}
            <div className="d-flex align-items-center mb-4">
              <span className="me-3 fw-bold">Quantity:</span>
              <Button variant="outline-secondary" size="sm" onClick={() => changeQuantity(-1)}>-</Button>
              <span className="mx-3 fw-bold fs-4">{quantity}</span>
              <Button variant="outline-secondary" size="sm" onClick={() => changeQuantity(1)}>+</Button>
            </div>

            <hr />
            <div className="d-flex gap-3 mt-4">
              <Button size="lg" style={{ backgroundColor: '#225788', border: 'none', padding: '12px 40px' }} onClick={addToCart}>
                Add to Cart
              </Button>
              <Button variant="outline-dark" size="lg" onClick={() => navigate(-1)} style={{ padding: '12px 40px' }}>
                Back
              </Button>
              <Button size="lg" variant="outline-dark" onClick={() => navigate('/checkout')} style={{ padding: '12px 40px' }}>
                PLACE ORDER
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default SweetDetails;

// import React from "react";
// import { useParams, Link } from 'react-router-dom'; 
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import Header from "./Header";
// import Footer from "./Footer";

// // JSON Imports
// import sweetsData from "./sweet.json"; 
// import dryFruitsData from "./dry-fruits.json";
// import sweetsGiftingData from "./sweets-gifting.json";
// import biscottisData from "./biscottis.json";
// import guiltFreeData from "./guiltfree.json";
// import giftingData from "./gifting.json"

// function CollectionPage() {
//   const { slug } = useParams();
//   const currentSlug = slug.trim();
//   console.log("Current URL Slug:", slug); // Console-il check pannunga

//   const getCategoryData = () => {
//     switch (slug) {
//       case "sweets": return sweetsData;
//       case "dry-fruits": return dryFruitsData;
//       case "sweets-gifting": return sweetsGiftingData;
//       case "biscottis": return biscottisData;
//       case "guilt-free": return guiltFreeData;
//       case "gifting": return giftingData;
//       default: return [];
//     }
//   };

//   const products = getCategoryData();
//   console.log("Loaded Products:", products); // Ithu empty-a iruntha switch case match aagala nu artham

//   return (
//     <>
//       <Header />
//       <Container className="my-5">
//         <Row>
          
//           {products && products.length > 0 ? (
//             products.map((item) => (
//               <Col md={3} sm={6} key={item.id} className="mb-4">
//                  <Link to={`/collections/${slug}/item-details/${item.id}`}style={{ textDecoration: 'none' }}>
//                   <Card className="h-100 shadow-sm">
//                     <Card.Img variant="top" src={item.image} style={{ height: '250px', objectFit: 'cover' }} />
//                     <Card.Body className="text-center">
//                       <Card.Title>{item.name}</Card.Title>
//                       <p>₹{item.price}</p>
//                     </Card.Body>
//                   </Card>
//                 </Link>
//               </Col>
//             ))
//           ) : (
//             <h2 className="text-center">No Products Found for: {slug}</h2>
//           )}
//         </Row>
        
//       </Container>
      
//       <Footer />
//     </>
//   );
// }
// export default CollectionPage;
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'; 
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios"; 
import Header from "./Header";
import Footer from "./Footer";

function CollectionPage() {
  const { slug } = useParams(); // URL-il irukkum category-ai capture pannum (e.g., 'sweets', 'gifting')
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Backend API-kku request anuppum
    const encodedCategory = encodeURIComponent(slug.trim());
    axios.get(`http://localhost:5001/api/products/${encodedCategory}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]); // Data illana empty array
        setLoading(false);
      });
  }, [slug]); // Slug maruna udane update aagum
console.log("CollectionPage Slug:", slug);
  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center mb-4">{slug.replace('-', ' ').toUpperCase()}</h2>
     <Row>
  {loading ? (
    <h4 className="text-center">Loading...</h4>
  ) : products.length > 0 ? (
    products.map((item) => (
      <Col md={3} sm={6} key={item.productId} className="mb-4">
        {/* .product-card class add panniyirukken */}
        <Card className="product-card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
          
          <Link to={`/collections/${slug}/item-details/${item.productId}`} style={{ textDecoration: 'none' }}>
            {/* Zoom wrapper & image class-ai inge add panniyirukken */}
            <div className="image-zoom-wrapper" style={{ borderRadius: '15px 15px 0 0' }}>
              <Card.Img 
                variant="top" 
                src={item.image} 
                className="zoom-image"
                style={{ height: '250px', objectFit: 'cover' }} 
              />
            </div>
          </Link>

          <Card.Body className="text-center">
            <Card.Title className="fw-bold">{item.name}</Card.Title>
            <p className="fs-5" style={{ color: '#b87333', fontWeight: 'bold' }}>₹{item.price}</p>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <h4 className="text-center">No Products Found for: {slug}</h4>
  )}
</Row>
      </Container>
      <Footer />
    </>
  );
}

export default CollectionPage;
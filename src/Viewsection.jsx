import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewSection = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <h3 className="fw-bold text-center mb-5">
        Excellence In Every Bite Of Our Sweets, Snacks, And Treats
      </h3>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {data.map((prod) => (
          <Col key={prod.id}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${prod.id}`)}
            >
              <div style={{ height: "220px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={prod.image}
                  alt={prod.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold">{prod.name}</Card.Title>
                <Card.Text><strong>₹{prod.price}</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewSection;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import myImg from "../../Assets/avatar.svg";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={12}>
            <h1 style={{ fontSize: "2.6em", textAlign: "center" , color:"white"}}>
              SERVICES
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Link to="/service1"> {/* Link to Service1 component */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>IT Related</Card.Title>
                  <Card.Text>
                    Description of Service 1.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/service2"> {/* Link to Service2 component */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>Safety Related</Card.Title>
                  <Card.Text>
                    Description of Service 2.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/service3"> {/* Link to Service3 component */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>Lunch Booking</Card.Title>
                  <Card.Text>
                    Description of Service 3.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;

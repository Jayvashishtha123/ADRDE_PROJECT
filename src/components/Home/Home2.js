import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import myImg from "../../Assets/avatar.svg";
import { useAuth } from '../contexts/authContext'; // Adjust based on your auth context location

const Home2 = () => {
  const { currentUser } = useAuth(); // Fetch the current user from context
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Replace this with the actual admin email
  const adminEmail = "jay@gmail.com";
  
  useEffect(() => {
    if (currentUser && currentUser.email === adminEmail) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

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
            <Link to={isAdmin ? "/DataDisplayIT" : "/Service1"}> {/* Conditional Link */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>IT Related</Card.Title>
                  <Card.Text>
                    {isAdmin ? "Admin View of IT Service" : "User View of IT Service"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to={isAdmin ? "/DataDisplaySR" : "/Service2"}> {/* Conditional Link */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>Safety Related</Card.Title>
                  <Card.Text>
                    {isAdmin ? "Admin View of Safety Service" : "User View of Safety Service"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to={isAdmin ? "/DataDisplayLB" : "/Service3"}> {/* Conditional Link */}
              <Card className="service-card">
                <Card.Img variant="top" src={myImg} />
                <Card.Body>
                  <Card.Title>Lunch Booking</Card.Title>
                  <Card.Text>
                    {isAdmin ? "Admin View of Lunch Booking" : "User View of Lunch Booking"}
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

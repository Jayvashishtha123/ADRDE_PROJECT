import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
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
    <Container fluid className="user-history-container">
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="user-history-heading">
              MY REQUESTS:-
            </h1>
            {isAdmin && (
              <Alert variant="success" className="admin-alert">
                You are an Admin! Hihihi
              </Alert>
            )}
          </Col>
        </Row>
        {!isAdmin && currentUser && (
          <Row>
            <Col md={4}>
              <Link to="/UserDataIT">
                <Card className="user-history-service-card">
                  <Card.Img variant="top" src={myImg} />
                  <Card.Body>
                    <Card.Title>IT Related</Card.Title>
                    <Card.Text>
                      User View of IT Service
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/UserDataSR">
                <Card className="user-history-service-card">
                  <Card.Img variant="top" src={myImg} />
                  <Card.Body>
                    <Card.Title>Safety Related</Card.Title>
                    <Card.Text>
                      User View of Safety Service
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/UserDataLB">
                <Card className="user-history-service-card">
                  <Card.Img variant="top" src={myImg} />
                  <Card.Body>
                    <Card.Title>Lunch Booking</Card.Title>
                    <Card.Text>
                      User View of Lunch Booking
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Home2;

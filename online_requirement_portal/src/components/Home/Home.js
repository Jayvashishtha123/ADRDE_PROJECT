import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import drdo_logo from "../../Assets/drdo_logo.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useAuth } from '../contexts/authContext';

function Home() {
  const { userLoggedIn, currentUser } = useAuth();

  // Function to generate the greeting message
  const generateGreetingMessage = () => {
    if (userLoggedIn && currentUser && currentUser.email) {
      const userName = currentUser.email.substring(0, 5);
      return (
        <>
          Hi {userName}!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋
          </span>
        </>
      );
    } else {
      return (
        <>
          Hi Buddy!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋
          </span>
        </>
      );
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {generateGreetingMessage()}
              </h1>

              <h1 className="heading-name">
                This is
                <strong className="main-name"> Online Requirement Portal!</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={drdo_logo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;

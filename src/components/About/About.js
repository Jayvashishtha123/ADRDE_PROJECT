import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DRDOImage from "../../Assets/drdo_logo.png"; // Import an image representing DRDO

function About() {
  return (
    <Container fluid className="about-section drdo-about">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px 0" }}>
          <Col md={7} style={{ paddingBottom: "30px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              About <strong className="purple">Us!</strong>
            </h1>
            <p>
              The Aerial Delivery Research and Development Establishment (ADRDE) is a premier laboratory under the Defense Research and Development Organization (DRDO), dedicated to the research, design, and development of cutting-edge aerial delivery systems for India’s defense forces. Situated in Agra, Uttar Pradesh, ADRDE is a beacon of innovation in aerial technology, contributing significantly to the self-reliance and operational capabilities of India's defense sector.
            </p>
          </Col>

          <Col md={7} style={{ paddingBottom: "30px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Historical <strong className="purple">Background</strong>
            </h1>
            <p>
              Established in 1967, ADRDE initially focused on the development of simple parachute systems for personnel and cargo. Over the decades, the lab has evolved into a sophisticated hub for advanced research, encompassing a wide range of aerial delivery technologies including recovery systems, precision airdrop systems, and specialized parachutes. The laboratory's continuous growth and achievements reflect its commitment to innovation and excellence.
            </p>
          </Col>

          <Col md={7} style={{ paddingBottom: "30px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Our <strong className="purple">Vision</strong>
            </h1>
            <p>
              To empower India with cutting-edge defense technologies and create a world-class defense research and development organization, transforming the nation's defense capabilities to achieve excellence in technology, innovation, and security.
            </p>
          </Col>

          <Col md={7} style={{ paddingBottom: "30px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Key Projects and <strong className="purple">Innovations</strong>
            </h1>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li>
                <strong>Para-Modules</strong>: ADRDE has developed advanced para-modules for cargo delivery, enhancing the efficiency and precision of air-drop missions.
              </li>
              <li>
                <strong>Aerial Delivery System for High-Altitude Drops</strong>: Innovations in high-altitude airdrop systems, ensuring effective operations in challenging environments.
              </li>
              <li>
                <strong>Recovery Systems for Space Missions</strong>: Contribution to recovery systems for India's space missions, including key projects for ISRO.
              </li>
              <li>
                <strong>Precision Airdrop Technology</strong>: Development of precision airdrop technologies that allow for accurate placement of supplies, crucial in tactical and humanitarian missions.
              </li>
            </ul>
          </Col>

          <Col md={7} style={{ paddingBottom: "50px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Our <strong className="purple">Mission</strong>
            </h1>
            <p>
              To design, develop, and deliver state-of-the-art defense systems and technologies, ensuring self-reliance in defense capabilities and providing the Indian armed forces with the necessary tools to maintain the security and sovereignty of the nation.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;


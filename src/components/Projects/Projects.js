import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle"; // Ensure this component is defined and imported correctly

function Projects() {
  return (
    <Container fluid className="project-section">
      <div className="project-container">
        <h1 className="project-heading">
          Contact <strong className="purple">Us!</strong>
        </h1>
        <p>
          Reach out to us for more information or any inquiries:
        </p>
        <ul className="contact-list">
          <li>
            <strong>Location:</strong> ADRDE, DRDO, Agra, Uttar Pradesh, India
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+911234567890" className="contact-link">
              +91 1234567890
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@adrde.drdo.in" className="contact-link">
              info@adrde.drdo.in
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href="https://www.adrde.drdo.in" className="contact-link" target="_blank" rel="noopener noreferrer">
              www.adrde.drdo.in
            </a>
          </li>
          <li>
            <strong>Contact Person:</strong> Dr. John Doe
          </li>
          <li>
            <strong>Address:</strong> 123 DRDO Road, Agra, Uttar Pradesh, 282001, India
          </li>
          <li>
            <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default Projects;
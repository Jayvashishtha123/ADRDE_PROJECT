import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import todo from "../../Assets/Projects/todo.png";
import stopwatch from "../../Assets/Projects/stopwatch.png";
import portfolio from "../../Assets/Projects/Portfolio.png";
import BTECH_VISION from "../../Assets/Projects/BTECH_VISION.png";

import timer from "../../Assets/Projects/timer.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={timer}
              isBlog={false}
              title="Digital Clock"
              description="Introducing our innovative Digital Clock app built with React! Seamlessly blending style and functionality, our Digital Clock offers a modern and sleek timekeeping solution. With a user-friendly interface, this app provides accurate and real-time updates, ensuring you stay in sync with the current time. Customize your experience with adjustable settings, choose from a variety of themes, and enjoy a visually pleasing and responsive display. Whether you're looking for a simple timekeeping tool or a stylish addition to your digital workspace, our React-based Digital Clock app is designed to meet your needs with precision and elegance."
              ghLink="https://github.com/Jayvashishtha123/Digital_Clock-React.js-.git"
              demoLink="https://digitalclock7497121.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={BTECH_VISION}
              isBlog={false}
              title="BTech_Vision"
              description="Embark on an educational journey with the B.Tech Vision app, a dynamic and innovative platform crafted using Flutter and powered by Firebase. This app is designed to revolutionize the B.Tech learning experience, offering a comprehensive suite of features to students pursuing engineering degrees. From interactive quizzes that challenge your knowledge to engaging content that simplifies complex concepts, B.Tech Vision is your go-to companion for academic success"
              ghLink="https://github.com/Jayvashishtha123/Btech-Vision-Flutter-.git"
              demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stopwatch}
              isBlog={false}
              title="Stopwatch"
              description="Introducing our cutting-edge Stopwatch app, crafted with React for a seamless and precise timekeeping experience. This app goes beyond the traditional stopwatch, offering a feature-rich interface with accuracy down to the milliseconds. Whether you're tracking your workout sessions, measuring event durations, or managing time-sensitive tasks, our React Stopwatch provides a sleek and user-friendly solution. With intuitive controls, lap time recording, and a visually dynamic display, this app enhances your time management with style. Embrace efficiency and precision in time tracking – try our React Stopwatch today"
              ghLink="https://github.com/Jayvashishtha123/StopWatch_React.js.git"
              demoLink="https://stopwatch7497121.netlify.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={todo}
              isBlog={false}
              title="To-Do-List"
              description="Introducing our sleek and efficient ToDoList app, meticulously crafted with React to elevate your task management experience. This user-friendly application redefines productivity by seamlessly blending modern design with powerful functionality. Say goodbye to forgetfulness and hello to organized living with the React ToDoList app"
              ghLink="https://github.com/Jayvashishtha123/To_do_list_in_react.git"
              demoLink="https://to-do-list-74-97-121.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={portfolio}
              isBlog={false}
              title="My-Portfolio"
              description="Introducing my impressive and personalized Portfolio App, meticulously crafted with React to showcase my skills, projects, and achievements in a visually stunning and user-friendly manner. This Portfolio App is more than just a digital resume; it's a dynamic representation of my professional journey, designed to leave a lasting impression."
              ghLink=" https://github.com/Jayvashishtha123/My-Portfolio.git"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo_strip from "../Assets/drdo_logo_strip.png";
import { AiOutlineHome, AiOutlineUser, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import { doSignOut } from "./firebase/auth";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const handleLogout = () => {
    doSignOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo_strip} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link onClick={() => updateExpanded(false)} href="/">
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => updateExpanded(false)} href="/about">
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => updateExpanded(false)} href="/project">
                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Contact Us
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <nav className='custom-navbar'>
  {
    userLoggedIn
      ?
      <button 
        onClick={() => { doSignOut().then(() => { navigate('/login') }) }} 
        className='custom-nav-button'
      >
        Logout
      </button>
      :
      <>
       <button class="custom-button login-button">
  <Link className="custom-nav-link" to="/login">Login</Link>
</button>
<button class="custom-button signup-button">
  <Link className="custom-nav-link" to="/register">Sign up</Link>
</button>

      </>
  }
</nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/blogs">Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogs/newblog">New Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav.Link href="/log-in">Log in</Nav.Link>
      <Nav.Link href="/sign-up">Sign up</Nav.Link>
    </Navbar>
  )
}

export default Navigation
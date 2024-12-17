import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = ({ name }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        {name ? (
                            <Navbar.Text className="text-white">
                                Welcome, <strong>{name}</strong>
                            </Navbar.Text>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

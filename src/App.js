import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/produk">Produk</Nav.Link>
          <Nav.Link href="/penjual">Penjual</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;

import React from 'react';
import { Navbar, Container, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Cart/CartGlobalState';
import './Header.css';

const Header = () => {
  // const { totalItems } = useCart();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3 logo">
          OBSM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="searchField">
            <FaSearch className="faSearch position-absolute" />
            <FormControl type="search" placeholder="Search for books, authors, or genres..." className="ps-5 py-2" aria-label="Search" />
          </Form>

          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <Button as={Link} to="/login" className="login-btn me-4 px-4 py-2">
              Login
            </Button>

            <Link to="/cart" className="position-relative text-dark fs-4">
              <FaShoppingCart />
              {/* {totalItems > 0 && (
                // <Badge pill bg="danger" className="position-absolute" style={{ top: '-5px', right: '-10px', fontSize: '0.65rem' }}>
                //   {totalItems}
                // </Badge>
              )} */}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

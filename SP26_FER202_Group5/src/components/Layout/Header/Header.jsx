import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../../Context/Cart/CartGlobalState';
import './Header.css';

const Header = () => {
  const { totalItems, syncUser } = useCart();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    syncUser(); // reset cartItems về [] trong context
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fs-3 logo">
          OBSM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* SEARCH */}
          <Form className="searchField">
            <FaSearch className="faSearch position-absolute" />
            <FormControl type="search" placeholder="Search for books, authors, or genres..." className="ps-5 py-2" aria-label="Search" />
          </Form>

          {/* RIGHT SIDE */}
          <Nav className="d-flex align-items-center mt-3 mt-lg-0 gap-3">
            {/* USER */}
            {user ? (
              <NavDropdown title={<FaUserCircle size={28} />} align="end" id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button as={Link} to="/login" className="login-btn px-4 py-2">
                Login
              </Button>
            )}

            {/* CART - chỉ hiện badge khi đã đăng nhập và có sản phẩm */}
            <Link to="/cart" className="position-relative text-dark fs-4">
              <FaShoppingCart />
              {user && totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute" style={{ top: '-5px', right: '-10px', fontSize: '0.65rem' }}>
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../service/api";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getAllCategories();
      setCategories(categoryData);
    };
    fetchData();
  }, []);

  return (
    <Navbar className="main-navbar" expand="lg">
      <Container>

        {/* Toggle button */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto nav-menu">
            <NavDropdown title="Categories" id="category-dropdown">
              {categories.map((cat) => (
                <NavDropdown.Item  key={cat.id} as={Link}  to={`/categories/${cat.id}`}  className="category-item">
                  {cat.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/"> Home </Nav.Link>
            <Nav.Link as={Link} to="/books"> Books </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
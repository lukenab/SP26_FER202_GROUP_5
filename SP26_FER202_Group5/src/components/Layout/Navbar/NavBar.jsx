import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { getAllCategories, getAllBook } from "../../../service/api";

const NavBar = () => {

  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getAllCategories()
      const bookData = await getAllBook()

      const sorted = categoryData
        .filter(cat => cat.status === "Active")
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        )

      setCategories(sorted)
      setBooks(bookData)
    }

    fetchData()
  }, [])

  return (
    <Navbar className="main-navbar" expand="lg">
      <Container>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* LEFT */}
          <Nav>
            <NavDropdown title="Categories" className="category-dropdown">

              {categories.map((cat) => (
                <NavDropdown.Item
                  key={cat.id}
                  as={Link}
                  to={`/category/${cat.id}`}
                  className="category-item"
                >
                  {cat.name} ({books.filter(b => String(b.category_id) === String(cat.id)).length})
                </NavDropdown.Item>
              ))}

            </NavDropdown>
          </Nav>

          {/* RIGHT */}
          <Nav className="nav-right">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/books">Books</Nav.Link>
            <Nav.Link as={Link} to="/news">New</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
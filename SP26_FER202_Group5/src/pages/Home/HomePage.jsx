import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { getAllBook } from '../../service/api';

const HomePage = () => {
  const  [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBookData = async () => {
        try {
            const data = await getAllBook();
            setBooks(data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    fetchBookData();
  }, [])
  
  const popularBooks = books.slice(0, 8);
  return (
    <div className="homepage-wrapper">
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center mb-5">
        <Container>
          <h1 className="display-4 fw-bold mb-3">Your Next Adventure Awaits</h1>
          <p className="lead mb-4">Discover thousands of books across all genres. From timeless classics to contemporary bestsellers, find your perfect read today.</p>
          <Button as={Link} to="/books" size="lg" className="shop-now-btn px-5 py-3 fw-bold">
            Discover Now
          </Button>
        </Container>
      </section>

      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="fw-bold m-0" style={{ color: '#1e3d52' }}>Popular Book</h2>
          <Link to="/books" className="text-decoration-none fw-semibold">View All &raquo;</Link>
        </div>

        <Row>
          {popularBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={3} className="mb-4" style={{height: "550px"}}>
              <Card className="p-2 h-100 book-card shadow-sm border-0">
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={book.image} className="book-image" />
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold fs-5 text-truncate">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">{book.author}</Card.Subtitle>
                  
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="text-danger fw-bold fs-5">{book.price}</span>
                    <Button as={Link} to={`/books/${book.id}`} variant="outline-primary" className="view-detail-btn">
                      View Detail
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
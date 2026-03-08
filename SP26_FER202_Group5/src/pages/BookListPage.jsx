import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllBook, getAllCategories } from '../service/api';

import HeroBanner from '../components/HeroBanner';
import LeftPanel from '../components/LeftPanel';
import BookCard from '../components/BookCard';

import './BookListPage.css';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getAllBook();
      const categoryData = await getAllCategories();

      setBooks(bookData);
      setCategories(categoryData);
    };

    fetchData();
  }, []);

  // sách mới
  const newBooks = [...books].sort((a, b) => b.publication_year - a.publication_year).slice(0, 5);

  //featured random
  const featuredBooks = [...books].sort(() => 0.5 - Math.random()).slice(0, 8);

  // sắp hết hàng
  const lowStockBooks = books.filter((b) => b.stock <= 5).slice(0, 8);

  //  book theo category
  const booksByCategory = categories.map((category) => ({
    ...category,
    books: books.filter((book) => book.category_id === category.id),
  }));

  return (
  <>
    {/* HERO */}
    <HeroBanner />

    <Container fluid className="mt-4">

      <Row>

        {/* LEFT PANEL */}
        <Col lg={3}>
          <LeftPanel newBooks={newBooks}/>
        </Col>

        {/* BOOK AREA */}
        <Col lg={9}>

          {/* FEATURED */}
          <div className="category-block">
            <h5>Featured Books</h5>

            <Row xs={2} md={4} className="g-3">
              {featuredBooks.map((book)=>(
                <Col key={book.id}>
                  <BookCard book={book}/>
                </Col>
              ))}
            </Row>

          </div>

        </Col>

      </Row>

    </Container>
  </>
);
};

export default BookListPage;

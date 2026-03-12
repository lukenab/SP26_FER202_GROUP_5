import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllBook, getAllCategories } from '../../service/api';
import { Link } from 'react-router-dom';

import HeroBanner from '../Home/HeroBanner';
import LeftPanel from '../../components/LeftPanel';
import BookCard from '../../components/UI/BookCard';

import './BookListPage.css';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getAllBook();
        const categoryData = await getAllCategories();

        setBooks(bookData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);
  // sách mới phát hành
  const newBooks = [...books].sort((a, b) => b.publication_year - a.publication_year).slice(0, 5);

  // sách mới lên kệ
  const newArrivals = [...books].sort((a, b) => b.id - a.id).slice(0, 6);

  // featured random
  const featuredBooks = [...books].sort(() => 0.5 - Math.random()).slice(0, 8);

  // sắp hết hàng
  const lowStockBooks = books.filter((b) => b.stock <= 5).slice(0, 5);

  // sách theo category
  const booksByCategory = [...categories]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((category) => ({
      ...category,
      books: books
        .filter((book) => book.category_id === category.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4),
    }));

  return (
    <>
      <Container fluid className="mt-1">
        {/* HERO */}
        <HeroBanner />

        <Row>
          {/* LEFT PANEL */}
          <Col lg={3}>
            <Row className="mb-3">
              <LeftPanel newBooks={newBooks} title={'New Books'} />
            </Row>

            <Row className="mb-3">
              <LeftPanel newBooks={newArrivals} title={'New Arrivals'} />
            </Row>
          </Col>

          {/* BOOK AREA */}
          <Col lg={9}>
            {/* FEATURED */}
            <div className="category-block">
              <h4 className="fw-bold">New Featured</h4>

              <Row xs={2} md={4} className="g-3 mb-2">
                {featuredBooks.map((book) => (
                  <Col key={book.id}>
                    <BookCard book={book} />
                  </Col>
                ))}
              </Row>
            </div>

            {/* BOOKS BY CATEGORY */}
            {booksByCategory.map((category) => (
              <div key={category.id} className="category-block mt-4">
                <h4 className="fw-bold">{category.name}</h4>

                {category.books.length > 0 ? (
                  <Row xs={2} md={4} className="g-3">
                    {category.books.map((book) => (
                      <Col key={book.id}>
                        <BookCard book={book} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="empty-category">
                    <p>No books available in this category yet</p>
                  </div>
                )}

                {/* VIEW ALL */}
                <div className="text-end mt-2">
                  <Link to={`/category/${category.id}`} className="view-all-link">
                    View All →
                  </Link>
                </div>
              </div>
            ))}
          </Col>
        </Row>

        {/* LOW STOCK */}
        <Row className="category-block">
          <h4 className="fw-bold">Low Stock Books</h4>

          <Row xs={2} md={5} className="g-3 mb-2">
            {lowStockBooks.map((book) => (
              <Col key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default BookListPage;

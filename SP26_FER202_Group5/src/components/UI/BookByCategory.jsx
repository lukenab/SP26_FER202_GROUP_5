import React, { useEffect } from 'react';
import BookCard from './BookCard';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBook, getAllCategories } from '../../service/api';
import '../../pages/Books/BookListPage.css';
const BookByCategory = () => {
  const { id } = useParams();
  const [Listbooks, setListBook] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getAllBook();
      const cateData = await getAllCategories();
      setListBook(bookData);
      setCategory(cateData);
    }
    fetchData();
  }, []);

  const List = Listbooks.filter((book) => book.category_id === id);
  const currentCategory = category.find((c) => c.id === id);
  return (
    <>
      <Container className='my-4'>
        {/* Breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/', style: { textDecoration: 'none' } }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books', style: { textDecoration: 'none' } }}>
            Books
          </Breadcrumb.Item>

          <Breadcrumb.Item active>{currentCategory ? currentCategory.name : ""}</Breadcrumb.Item>
        </Breadcrumb>


        <div className='category-block'>
          <h2>{currentCategory?.name}</h2>
          <p className="text-muted">
            {currentCategory?.description}
          </p>
          {List.length > 0 ? (
            <Row xs={2} md={5} className="g-3 my-2 ">
              {List.map((book) => (
                <Col key={book.id}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>

          ) : (
            <Row className="justify-content-center mt-5">
              <Col md="auto">
                <h3>This category does not include books!</h3>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </>
  );
};

export default BookByCategory;

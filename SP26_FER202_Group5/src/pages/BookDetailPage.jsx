import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAllCategories, getBookDetail, getAllBook } from '../service/api';
import BookCard from '../components/BookCard';
import { Row, Container, Breadcrumb, Col, Button, InputGroup, Form, Table, Card } from 'react-bootstrap';
import { useCart } from '../components/Cart/CartGlobalState';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookDetail = await getBookDetail(id);
      const cate = await getAllCategories();
      const bookData = await getAllBook();
      setBook(bookDetail);
      setCategories(cate);
      setBooks(bookData);
    };
    fetchData();
  }, [id]);

  const [quantity, setCount] = useState(1);
  const handleIncrease = () => setCount(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setCount(quantity - 1);
  };

  // const handleAddToCart = () => {
  //   addToCart(book, quantity);
  //   navigate('/cart');
  // };

  if (!book) {
    return (
      <>
        <h2>Book not Found!</h2>
        <Link to="/books">
          <Button variant="secondary" className="mt-3">
            Back to Book List
          </Button>
        </Link>
      </>
    );
  }

  const listSameBook = books
    .filter((item) => item.category_id === book.category_id && item.id !== book.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/', style: { textDecoration: 'none' } }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books', style: { textDecoration: 'none' } }}>
          Books
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{book.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Card detail */}
      <Container className="shadow-lg border-0 rounded-3 mb-4">
        <h4 className="pt-2">{book.title}</h4>
        <hr />
        <Row>
          {/* Cột 1 - ảnh */}
          <Col md={4} className="p-3">
            <img src={book.image} className="shadow-sm border-1 rounded-5 p-3" alt={book.title} style={{ width: '100%', height: '440px', objectFit: 'contain' }} />
          </Col>

          {/* Cột 2 - thông tin + thêm giỏ */}
          <Col md={4}>
            <Row>
              <p className="fs-2 fw-bold" style={{ color: '#1e3d52' }}>
                Price: ${Number(book.price.slice(1)).toFixed(2)}
              </p>
            </Row>
            <Row>
              <p>Stock: {book.stock}</p>
            </Row>
            <Row className="mb-3 p-3">
              <div className="border rounded-3 p-3" style={{ borderColor: '#1e3d52', backgroundColor: '#e8eef2' }}>
                <h6 className="fw-bold" style={{ color: '#1e3d52' }}>
                  Book Description
                </h6>
                <hr />
                <p className="mb-0 text-secondary lh-lg text-break" style={{ textAlign: 'justify' }}>
                  {book.description}
                </p>
              </div>
            </Row>
            <Row>
              {/* Chọn số lượng */}
              <InputGroup size="sm" style={{ width: '230px', height: '40px' }}>
                <Button variant="outline-secondary" className="px-3 border-1" onClick={handleDecrease}>
                  -
                </Button>
                <Form.Control readOnly value={quantity} className="text-center border-secondary border-1" style={{ maxWidth: '52px' }} />
                <Button variant="outline-secondary" className="px-3 border-1" onClick={handleIncrease}>
                  +
                </Button>
              </InputGroup>
            </Row>
            <Row className="my-3 g-3 text-white">
              <Col>
                <Button className="w-100" style={{ background: '#1e3d52' }}>
                  ADD TO CART
                </Button>
              </Col>
              <Col>
                <Button className="w-100" as={Link} to="/orders" style={{ background: '#1e3d52' }}>
                  BUY NOW
                </Button>
              </Col>
            </Row>
          </Col>

          {/* Cột 3 - thông tin chi tiết */}
          <Col md={4} className="px-5">
            <Row className="mb-5">
              <Card className="py-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <img variant="top" src="/images/logo.png" className="p-2" width="135" height="62" alt="logo" />
                    <small>Explore Books</small>
                  </div>
                  <Button as={Link} to="/books" style={{ background: '#1e3d52' }}>
                    View More ›
                  </Button>
                </div>
              </Card>
            </Row>
            <Row>
              <Table bordered striped className="rounded-3 overflow-hidden">
                <tbody>
                  <tr>
                    <td>Title</td>
                    <td>{book.title}</td>
                  </tr>
                  <tr>
                    <td>Author</td>
                    <td>{book.author}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{book.country}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{categories.find((c) => c.id === book.category_id)?.name || 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td>Publication year</td>
                    <td>{book.publication_year}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Related books */}
      <div className="shadow-lg border-0 rounded-3 mb-4 p-3">
        <h4>Related Books</h4>
        {listSameBook.length > 0 ? (
          <Row className="g-4">
            {listSameBook.map((book) => (
              <Col key={book.id} md={3}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-muted">No related books found.</p>
        )}
      </div>
    </>
  );
};

export default BookDetailPage;

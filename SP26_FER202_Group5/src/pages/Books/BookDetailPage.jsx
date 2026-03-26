import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAllCategories, getBookDetail, getAllBook } from '../../service/api';
import BookCard from '../../components/UI/BookCard';
import { Row, Container, Breadcrumb, Col, Button, InputGroup, Form, Table, Card, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../../components/Context/Cart/CartGlobalState';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, currentUser } = useCart();

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

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

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setShowAddedToast(true);
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      setShowLoginToast(true);
      return;
    }
    addToCart(book, quantity);
    navigate('/orders');
  };

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

  const listSameBook = books.filter((item) => item.category_id === book.category_id && item.id !== book.id).slice(0, 4);

  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {/* Toast thêm vào giỏ thành công */}
        <Toast show={showAddedToast} onClose={() => setShowAddedToast(false)} delay={2500} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto">✅ Added to Cart</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            <strong>{book.title}</strong> has been added to your cart!{' '}
            <Link to="/cart" style={{ color: '#fff', textDecoration: 'underline' }}>
              View Cart
            </Link>
          </Toast.Body>
        </Toast>

        {/* Toast yêu cầu đăng nhập khi Buy Now */}
        <Toast show={showLoginToast} onClose={() => setShowLoginToast(false)} delay={3000} autohide bg="warning">
          <Toast.Header>
            <strong className="me-auto">⚠️ Login Required</strong>
          </Toast.Header>
          <Toast.Body>
            You need to{' '}
            <Link to="/login" style={{ fontWeight: 600, color: '#1e3d52' }}>
              sign in
            </Link>{' '}
            to purchase items.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Breadcrumb className="pt-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/', style: { textDecoration: 'none' } }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books', style: { textDecoration: 'none' } }}>
          Books
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{book.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="shadow-lg border-0 rounded-3 mb-4 p-4">
        <h4>{book.title}</h4>
        <hr />
        <Row>
          <Col md={4} className="p-3">
            <img src={book.image} className="shadow-sm border-1 rounded-5 p-3" alt={book.title} style={{ width: '100%', height: '440px', objectFit: 'contain' }} />
          </Col>

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
                <Button className="w-100" onClick={handleAddToCart} style={{ background: '#1e3d52' }}>
                  ADD TO CART
                </Button>
              </Col>
              <Col>
                <Button className="w-100" onClick={handleBuyNow} style={{ background: '#1e3d52' }}>
                  {currentUser ? 'BUY NOW' : '🔒 BUY NOW'}
                </Button>
              </Col>
            </Row>
            {!currentUser && (
              <small className="text-muted">
                <Link to="/login" style={{ color: '#1e3d52' }}>
                  Sign in
                </Link>{' '}
                to purchase items
              </small>
            )}
          </Col>

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
